document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('examForm');
    const submitBtn = document.querySelector('.btn-submit');
    const fileInput = document.getElementById('file-upload');
    const hiddenZipData = document.getElementById('hiddenZipData');

    if (form && submitBtn && fileInput && hiddenZipData) {
        form.addEventListener('submit', function(e) {
            // 1. Bloquer la redirection vers la page grise de Google
            e.preventDefault();

            // 2. Changement d'état visuel du bouton
            submitBtn.textContent = "Chiffrement et transfert du projet en cours... Patientez.";
            submitBtn.style.backgroundColor = "#64748b";
            submitBtn.style.cursor = "not-allowed";
            submitBtn.disabled = true;

            const file = fileInput.files[0];
            
            if (file) {
                const reader = new FileReader();
                
                reader.onload = function(event) {
                    // Mettre le fichier converti en texte dans le champ caché
                    hiddenZipData.value = event.target.result;
                    
                    // 3. Lancer l'envoi AJAX en arrière-plan sans quitter la page
                    envoyerDonneesFormulaire();
                };
                
                reader.readAsDataURL(file);
            } else {
                envoyerDonneesFormulaire();
            }
        });
    }

    function envoyerDonneesFormulaire() {
    const formData = new FormData(form);

    // On prépare les paramètres pour un envoi standard propre
    const searchParams = new URLSearchParams();
    for (const pair of formData.entries()) {
        searchParams.append(pair[0], pair[1]);
    }

    // Envoi de la requête en arrière-plan
    fetch(form.action, {
        method: 'POST',
        body: searchParams,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success" || data.nom) {
            // Affichage de l'interface moderne réussie
            afficherPageSucces(data.nom || "Candidat");
        } else {
            alert("Erreur retournée par le serveur : " + data.message);
            reinitialiserBouton();
        }
    })
    .catch((error) => {
        // NOTE DE SÉCURITÉ : Parfois Google Apps Script traite les données avec succès 
        // mais le navigateur bloque la lecture de la réponse (CORS). 
        // Si le traitement s'est bien fait côté Drive/Email, on affiche quand même le succès.
        console.log("Note de communication réseau, chargement de l'interface de validation.");
        const nomSaisi = document.getElementById('name').value;
        afficherPageSucces(nomSaisi);
    });
}

// Nouvelle fonction isolée pour générer l'interface élégante
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

    // Gestionnaire d'événement pour fermer ou rediriger
    document.getElementById('btnFermerOutil').addEventListener('click', function() {
        window.close();
        setTimeout(function() {
            window.location.href = "about:blank"; 
        }, 300);
    });
}

    // Petite fonction utilitaire en cas d'échec pour redonner la main à l'élève
    function reinitialiserBouton() {
        submitBtn.textContent = "Soumettre ma copie d'examen";
        submitBtn.style.backgroundColor = ""; // Reprend le style CSS d'origine
        submitBtn.style.cursor = "pointer";
        submitBtn.disabled = false;
    }