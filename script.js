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

    // Fonction d'envoi asynchrote vers Google Apps Script
    function envoyerDonneesFormulaire() {
        const formData = new FormData(form);

        // Envoi de la requête en arrière-plan
        fetch(form.action, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Permet de contourner les blocages de sécurité inter-domaines
        })
        .then(() => {
            // 4. Succès : On modifie directement l'affichage de l'interface pour l'élève
            form.innerHTML = `
                <div style="text-align: center; padding: 40px 20px; color: #16a34a;">
                    <h2 style="font-size: 24px; margin-bottom: 15px;">✓ Copie transmise avec succès !</h2>
                    <p style="color: #475569; font-size: 15px; line-height: 1.6;">
                        Félicitations, vos réponses théoriques ainsi que votre archive ZIP ont bien été envoyées et sécurisées dans le dossier d'examen.
                    </p>
                </div>
            `;
            // Remonter en haut de la zone de formulaire pour que l'élève voie le message
            window.scrollTo({ top: form.offsetTop - 20, behavior: 'smooth' });
        })
        .catch((error) => {
            console.error("Erreur détectée :", error);
            submitBtn.textContent = "Erreur lors de l'envoi. Réessayez.";
            submitBtn.style.backgroundColor = "#dc2626";
            submitBtn.disabled = false;
        });
    }
});