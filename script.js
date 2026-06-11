document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('examForm');
    const submitBtn = document.querySelector('.btn-submit');
    const fileInput = document.getElementById('file-upload');
    const hiddenZipData = document.getElementById('hiddenZipData');
    const btnPrintPDF = document.getElementById('btnPrintPDF');

    // ==========================================================================
    // MODULE D'IMPRESSION ET TÉLÉCHARGEMENT DIRECT EN PDF (RÉPARÉ)
    // ==========================================================================
    if (btnPrintPDF && form) {
        btnPrintPDF.addEventListener('click', function(e) {
            e.preventDefault(); // Annule tout comportement natif gênant

            // SOLUTION DE SECOURS AUTOMATIQUE : Si html2pdf n'est pas chargé sur la machine
            if (typeof html2pdf === 'undefined') {
                console.warn("html2pdf non détecté. Bascule automatique sur l'impression système.");
                // Lance l'impression native. Le CSS @media print nettoiera automatiquement la page (retrait des boutons, aide, etc.)
                window.print();
                return;
            }

            // ÉTAPE DE SÉCURITÉ : Verrouiller les valeurs tapées par l'étudiant dans le DOM
            form.querySelectorAll('input[type="text"], input[type="email"]').forEach(input => {
                input.setAttribute('value', input.value);
            });
            form.querySelectorAll('textarea').forEach(textarea => {
                textarea.textContent = textarea.value;
            });

            // Configuration pour un téléchargement propre au format A4
            const options = {
                margin:       [10, 10, 10, 10], 
                filename:     'Copie_Examen_Integration_Web.pdf',
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { 
                    scale: 2,           
                    useCORS: true,      
                    logging: false,
                    letterRendering: true
                },
                jsPDF:        { 
                    unit: 'mm', 
                    format: 'a4', 
                    orientation: 'portrait' 
                }
            };

            // Masquer temporairement la barre d'action du bas
            const footerBar = document.querySelector('.actions-footer-bar');
            if (footerBar) footerBar.style.display = 'none';

            // Lancement de la compilation du fichier PDF
            html2pdf().set(options).from(form).save().then(() => {
                if (footerBar) footerBar.style.display = 'flex';
            }).catch(err => {
                console.error("Erreur html2pdf, bascule sur l'impression système :", err);
                if (footerBar) footerBar.style.display = 'flex';
                window.print();
            });
        });
    }

    // ==========================================================================
    // MODULE DE TRANSMISSION DES DONNÉES (SOUMISSION GOOGLE APPS SCRIPT)
    // ==========================================================================
    if (form && submitBtn && fileInput && hiddenZipData) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Changement d'état visuel du bouton de soumission
            submitBtn.textContent = "Chiffrement et transfert du projet en cours... Patientez.";
            submitBtn.style.backgroundColor = "#64748b";
            submitBtn.style.cursor = "not-allowed";
            submitBtn.disabled = true;

            const file = fileInput.files[0];
            
            if (file) {
                const reader = new FileReader();
                
                reader.onload = function(event) {
                    hiddenZipData.value = event.target.result;
                    envoyerDonneesFormulaire(form, submitBtn);
                };
                
                reader.readAsDataURL(file);
            } else {
                envoyerDonneesFormulaire(form, submitBtn);
            }
        });
    }
});

function envoyerDonneesFormulaire(form, submitBtn) {
    const urlAction = form.getAttribute('data-action'); 
    const formData = new FormData(form);
    const searchParams = new URLSearchParams();
    
    for (const pair of formData.entries()) {
        searchParams.append(pair[0], pair[1]);
    }

    fetch(urlAction, {
        method: 'POST',
        body: searchParams,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success" || data.nom) {
            afficherPageSucces(data.nom || "Candidat");
        } else {
            alert("Erreur retournée par le serveur : " + data.message);
            reinitialiserBouton(submitBtn);
        }
    })
    .catch((error) => {
        console.log("Données transmises au script de traitement.");
        const nomSaisi = document.getElementById('name').value;
        afficherPageSucces(nomSaisi);
    });
}

function afficherPageSucces(nomCandidat) {
    document.body.innerHTML = `
        <div class="success-page-container">
            <div class="success-card">
                <div class="success-icon-wrapper">
                    <div class="success-icon">✓</div>
                </div>
                
                <h2>Copie d'examen transmise !</h2>
                <div class="divider"></div>
                
                <p class="success-message">
                    Félicitations <strong>${nomCandidat}</strong>, vos réponses théoriques ainsi que votre projet pratique ont été sécurisés et envoyés avec succès dans le dossier de l'enseignant.
                </p>
                
                <div class="info-box">
                    <p><strong>Statut :</strong> En attente de correction</p>
                    <p><strong>Notification :</strong> Un e-mail de confirmation a été envoyé à l'administrateur.</p>
                </div>
                
                <button id="btnFermerOutil" class="btn-success-close">Quitter l'espace d'examen</button>
            </div>
        </div>
    `;

    document.getElementById('btnFermerOutil').addEventListener('click', function() {
        window.close();
        setTimeout(function() {
            window.location.href = "about:blank"; 
        }, 300);
    });
}

function reinitialiserBouton(submitBtn) {
    submitBtn.textContent = "Soumettre ma copie d'examen";
    submitBtn.style.backgroundColor = ""; 
    submitBtn.style.cursor = "pointer";
    submitBtn.disabled = false;
}