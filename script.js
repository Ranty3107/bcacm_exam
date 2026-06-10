document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('examForm');
    const submitBtn = document.querySelector('.btn-submit');
    const fileInput = document.getElementById('file-upload');
    const hiddenZipData = document.getElementById('hiddenZipData');

    if (form && submitBtn && fileInput && hiddenZipData) {
        form.addEventListener('submit', function(e) {
            // 1. Bloquer l'envoi immédiat pour exécuter la conversion
            e.preventDefault();

            // 2. Changement d'état visuel du bouton
            submitBtn.textContent = "Chiffrement et transfert du projet en cours... Patientez.";
            submitBtn.style.backgroundColor = "#64748b";
            submitBtn.style.cursor = "not-allowed";

            const file = fileInput.files[0];
            
            if (file) {
                const reader = new FileReader();
                
                // Cette fonction s'exécute dès que la lecture du fichier ZIP est finie
                reader.onload = function(event) {
                    // Mettre le fichier converti en texte dans le champ caché
                    hiddenZipData.value = event.target.result;
                    
                    // 3. Envoyer maintenant le formulaire final vers Google Apps Script
                    form.submit();
                };
                
                // Lancer la lecture du fichier sous forme de DataURL (Base64)
                reader.readAsDataURL(file);
            } else {
                // Si par mégarde aucun fichier n'est joint, envoyer le reste
                form.submit();
            }
        });
    }
});