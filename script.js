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

    // Fonction d'envoi asynchrone vers Google Apps Script
    function envoyerDonneesFormulaire() {
        const formData = new FormData(form);

        // Envoi de la requête en arrière-plan
        fetch(form.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json()) // Lecture de la réponse JSON du script Google
        .then(data => {
            if (data.status === "success") {
                
                // 1. On cible le body pour vider entièrement l'écran (enlève l'arrière-plan et la sidebar)
                document.body.innerHTML = `
                    <div style="
                        display: flex; 
                        justify-content: center; 
                        align-items: center; 
                        min-height: 100vh; 
                        background-color: #f1f5f9; 
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        padding: 20px;
                        box-sizing: border-box;
                    ">
                        <div style="
                            max-width: 550px; 
                            width: 100%;
                            background: white; 
                            padding: 40px 30px; 
                            border-radius: 12px; 
                            box-shadow: 0 10px 25px rgba(0,0,0,0.05); 
                            text-align: center;
                            border-top: 6px solid #16a34a;
                        ">
                            <div style="font-size: 50px; color: #16a34a; margin-bottom: 20px;">✓</div>
                            
                            <h2 style="font-size: 26px; color: #1e3a8a; margin-bottom: 15px; font-weight: 600;">
                                Copie transmise avec succès !
                            </h2>
                            
                            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                                Félicitations <strong>${data.nom}</strong>, vos réponses théoriques ainsi que votre archive ZIP ont bien été envoyées et sécurisées dans le dossier d'examen de l'enseignant.
                            </p>
                            
                            <button id="btnFermerOutil" style="
                                background-color: #1e3a8a; 
                                color: white; 
                                border: none; 
                                padding: 12px 35px; 
                                font-size: 16px; 
                                font-weight: 500;
                                border-radius: 6px; 
                                cursor: pointer; 
                                transition: background 0.2s;
                                width: 100%;
                                max-width: 150px;
                            ">
                                OK
                            </button>
                        </div>
                    </div>
                `;

                // 2. Gestionnaire d'événement pour le bouton "OK"
                document.getElementById('btnFermerOutil').addEventListener('click', function() {
                    // Tente de fermer l'onglet (fonctionne si l'onglet a été ouvert par un lien scripté)
                    window.close();
                    
                    // Solution de secours si le navigateur bloque la fermeture automatique :
                    // On redirige vers une page blanche ou vers l'accueil de votre site
                    setTimeout(function() {
                        window.location.href = "about:blank"; 
                    }, 300);
                });

            } else {
                alert("Erreur retournée par le serveur : " + data.message);
                reinitialiserBouton();
            }
        })
        .catch((error) => {
            console.error("Erreur détectée :", error);
            alert("Une erreur réseau est survenue. Veuillez vérifier votre connexion.");
            reinitialiserBouton();
        });
    }

    // Petite fonction utilitaire en cas d'échec pour redonner la main à l'élève
    function reinitialiserBouton() {
        submitBtn.textContent = "Soumettre ma copie d'examen";
        submitBtn.style.backgroundColor = ""; // Reprend le style CSS d'origine
        submitBtn.style.cursor = "pointer";
        submitBtn.disabled = false;
    }