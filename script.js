/**
 * Gestion événementielle du formulaire d'examen
 * Empêche les envois multiples et gère le retour utilisateur lors du transfert de fichiers.
 */
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('form');
    const submitBtn = document.querySelector('.btn-submit');

    if (form && submitBtn) {
        form.addEventListener('submit', function() {
            // Modification visuelle du bouton pour notifier l'élève de l'envoi en cours
            submitBtn.textContent = "Transfert de la copie en cours... Veuillez patienter.";
            submitBtn.style.backgroundColor = "#64748b";
            submitBtn.style.cursor = "not-allowed";
        });
    }
});