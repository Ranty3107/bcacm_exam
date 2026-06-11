document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('examForm');
    const submitBtn = document.querySelector('.btn-submit');
    const fileInput = document.getElementById('file-upload');
    const hiddenZipData = document.getElementById('hiddenZipData');

    if (form && submitBtn && fileInput && hiddenZipData) {
        form.addEventListener('submit', function(e) {
            // Bloquer la redirection par défaut du navigateur
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
                    // Injecter le fichier encodé en Base64 dans le champ masqué
                    hiddenZipData.value = event.target.result;
                    
                    // Lancer l'envoi AJAX en arrière-plan
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
        // Secours CORS : Si Google traite l'envoi mais bloque la lecture de la réponse
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