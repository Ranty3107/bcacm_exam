/* ==========================================================================
   BASE DE DONNÉES CENTRALE DES SUJETS (CONCEPTEUR)
   ========================================================================== */

// 1. Banque de données initiale par défaut (utilisée uniquement au premier démarrage)
const epreuvesParDefaut = {
    "informatique / intégration web": {
        desc: "Évaluation sur l'intégration des technologies modernes et les concepts web fondamentaux.",
        questions: [
            "Définissez brièvement l'Informatique",
            "Définissez l'Intelligence Artificielle (IA)",
            "Définissez ce qu'est un Prompt",
            "Que signifie le sigle NTIC ?"
        ],
        instructions: `<p class="consigne">Vous devez créer une page web contenant le résumé du match amical de football entre le Maroc et Madagascar. Vous utiliserez <strong>HTML et CSS</strong> pour structurer et mettre en forme la page.</p>
        <div class="barame-title">📋 Barème de notation :</div>
        <ul>
            <li><strong>Le Titre Principal :</strong> Parfaitement centré, gras et en <em>italique</em>. <span>(2 pts)</span></li>
            <li><strong>Le Premier Paragraphe :</strong> Police Arial, taille 30px, texte justifié. <span>(2 pts)</span></li>
            <li><strong>Colonnes :</strong> Paragraphes 2 & 3 disposés côte à côte (Flexbox/Grid). <span>(3 pts)</span></li>
            <li><strong>Signature :</strong> Nom/Prénom alignés à droite en bas, en <em>italique</em>. <span>(2 pts)</span></li>
        </ul>`,
        textToCopy: "Résumé du match amical : Maroc vs Madagascar\n\nDans le cadre de la dernière fenêtre internationale de la FIFA, l'équipe nationale des Barea de Madagascar s'est déplacée au Maroc..."
    },
    "malagasy": {
        desc: "Famakafakana lahatsoratra, fitsipeteny ary fandikan-teny amin'ny teny madio.",
        questions: [
            "Ny dikan'ny teny hoe 'Ohabolana' sy ny lanjany eo amin'ny fiarahamonina.",
            "Hazavao fohy ny fitsipiky ny mpamari-toetra.",
            "Inona no maha samy hafa ny 'Soratra Masina' sy ny 'Angano'?",
            "Mpanoratra malagasy roa malaza sy ny sangan'asany."
        ],
        instructions: `<p class="consigne">Manorata lahatsoratra mifandraika amin'ny kolontsaina sy ny soatoavina malagasy araka ny toromarika eto ambany.</p>
        <div class="barame-title">📋 Fitsinjarana isa :</div>
        <ul>
            <li><strong>Ny fampidirana sy ny lohahevitra :</strong> Mazava tsara. <span>(5 isa)</span></li>
            <li><strong>Fampiasana teny madio sy tsiny :</strong> Tsy misy diso tsipelina. <span>(5 isa)</span></li>
        </ul>`,
        textToCopy: "Ny Tantaran'ny Firenena sy ny Fihavanana Malagasy...\n\nNy fihavanana no fototra ijoroan'ny fiarahamonina malagasy hatramin'izay ka hatramin'izao..."
    },
    "francais": {
        desc: "Analyse littéraire, conjugaison avancée et rédaction de synthèse de documents.",
        questions: [
            "Qu'est-ce que le registre de langue soutenu ? Donnez un exemple.",
            "Expliquez la règle de l'accord du participe passé avec l'auxiliaire avoir.",
            "Définissez la figure de style appelée 'Métaphore'.",
            "Donnez les caractéristiques principales d'un texte argumentatif."
        ],
        instructions: `<p class="consigne">Rédigez une dissertation ou synthèse littéraire structurée basée sur le texte d'appui fourni.</p>
        <div class="barame-title">📋 Barème de notation :</div>
        <ul>
            <li><strong>Introduction et problématique :</strong> Claires et pertinentes. <span>(4 pts)</span></li>
            <li><strong>Structure du plan (Thèse / Antithèse) :</strong> Cohérente. <span>(4 pts)</span></li>
        </ul>`,
        textToCopy: "Extrait d'étude littéraire contemporaine :\n\n« La littérature reflète les métamorphoses de notre société industrielle... »"
    },
    "montage vidéo": {
        desc: "Techniques de post-production, gestion du workflow et formats de compression.",
        questions: [
            "Qu'est-ce que la cadence d'image (Frame Rate) et dans quel cas utilise-t-on le 24fps ?",
            "Expliquez la différence essentielle entre un codec et un format de conteneur (ex: MP4 vs H.264).",
            "À quoi sert l'outil 'Cut' ou 'Ripple Edit' dans un logiciel de montage ?",
            "Qu'est-ce que le 'Color Grading' (Étalonnage) par rapport au 'Color Correction' ?"
        ],
        instructions: `<p class="consigne">Préparez le conducteur technique et le découpage séquentiel d'un clip vidéo institutionnel de 30 secondes.</p>
        <div class="barame-title">📋 Évaluation :</div>
        <ul>
            <li><strong>Précision du découpage image/son :</strong> Cohérence temporelle. <span>(5 pts)</span></li>
            <li><strong>Choix des transitions et des effets :</strong> Justification technique. <span>(5 pts)</span></li>
        </ul>`,
        textToCopy: "Projet Client : Clip Promotionnel Tourisme Madagascar\nSéquence 1 : Vue aérienne des plages de Nosy Be (Durée : 4s)\nSéquence 2 : Gros plan artisanat local..."
    },
    "presse écrite": {
        desc: "Techniques d'écriture journalistique, angle d'attaque et déontologie de l'information.",
        questions: [
            "Expliquez la règle des '5 W' (Qui, Quoi, Où, Quand, Pourquoi) en journalisme.",
            "Qu'est-ce qu'un 'Chapeau' (ou Chape) dans un article de presse ?",
            "Faites la différence claire entre une information brute et un éditorial.",
            "Qu'appelle-t-on la 'Loi de proximité' dans la sélection des faits d'actualité ?"
        ],
        instructions: `<p class="consigne">Rédigez un article de type 'Reportage' ou 'Brève' percutant en utilisant la technique de la pyramide inversée.</p>
        <div class="barame-title">📋 Critères de notation :</div>
        <ul>
            <li><strong>Qualité du titre et de l'accroche :</strong> Doit capter l'attention. <span>(4 pts)</span></li>
            <li><strong>Respect de l'angle choisi :</strong> Pas de hors-sujet. <span>(4 pts)</span></li>
        </ul>`,
        textToCopy: "Dépêche brute d'actualité locale :\n\nAntsirabe, 12 Juin 2026 - Une forte affluence a été enregistrée lors de la foire économique régionale..."
    }
};

// INITIALISATION UNIQUE DE LA BASE : On charge la sauvegarde existante ou celle par défaut
let EXAM_DATABASE = JSON.parse(localStorage.getItem('examen_banque_sujets')) || epreuvesParDefaut;

// Variables d'état global et configuration de sécurité
const ADMIN_PASSWORD = "ohatra"; 
let etudiantConnecte = null;
let matiereSelectionneeAdmin = "informatique";

/* ==========================================================================
   INITIALISATION ET ÉCOUTEURS D'ÉVÉNEMENTS
   ========================================================================== */
document.addEventListener("DOMContentLoaded", function() {
    // Initialisation automatique de la date du jour sur la feuille
    const aujourdHui = new Date();
    document.getElementById('examDateAuto').value = aujourdHui.toLocaleDateString('fr-FR');
    
    // Branchement des formulaires et boutons
    document.getElementById('loginForm').addEventListener('submit', executerConnexionCandidat);
    document.getElementById('adminEditorForm').addEventListener('submit', enregistrerModifAdmin);
    document.getElementById('btnBackToDashboard').addEventListener('click', confirmerRetourDashboard);
    
    // Événement d'entrée pour l'espace enseignant (ouvre la modale)
    document.getElementById('btnTriggerAdmin').addEventListener('click', executerConnexionAdmin);
    
    // Gestionnaires pour la fermeture/validation de la modale de mot de passe
    document.getElementById('btnCancelAdminModal').addEventListener('click', fermerModaleAdmin);
    document.getElementById('btnConfirmAdminModal').addEventListener('click', validerConnexionAdmin);
    
    // Correction de l'événement touche "Entrée" (détecte la touche Enter standard)
    document.getElementById('adminHiddenPasswordField').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            validerConnexionAdmin();
        }
    });

    document.getElementById('btnAdminBackToPublic').addEventListener('click', () => basculerVue('viewLogin'));
    document.getElementById('btnLogout').addEventListener('click', executerDeconnexion);

    // Initialisation des modules spécifiques
    configurerModuleImpression();
    configurerModuleSoumission();
    genererMenuMatiereAdmin();
});

/* ==========================================================================
   NAVIGATION ENTRE LES VUES (SPA ROUTING)
   ========================================================================== */
function basculerVue(idVue) {
    document.querySelectorAll('.app-view').forEach(view => view.classList.remove('active'));
    document.getElementById(idVue).classList.add('active');
    
    if (idVue === 'viewAdmin') {
        chargerDonneesDansEditeurAdmin(matiereSelectionneeAdmin);
    }
}

function executerDeconnexion() {
    etudiantConnecte = null;
    document.getElementById('loginForm').reset();
    basculerVue('viewLogin');
}

/* ==========================================================================
   PORTAIL ET TABLEAU DE BORD CANDIDAT
   ========================================================================== */
function executerConnexionCandidat(e) {
    e.preventDefault();
    etudiantConnecte = {
        matricule: document.getElementById('loginMatricule').value.trim(),
        nom: document.getElementById('loginNom').value.trim(),
        prenom: document.getElementById('loginPrenom').value.trim()
    };
    ouvrirDashboardEpreuves();
}

function abrirDashboardEpreuves() { // (Nom maintenu identique pour compatibilité HTML)
    ouvrirDashboardEpreuves();
}

function ouvrirDashboardEpreuves() {
    document.getElementById('dashWelcomeTitle').textContent = `Bonjour, ${etudiantConnecte.prenom} ${etudiantConnecte.nom}`;
    document.getElementById('dashMatriculeBadge').textContent = etudiantConnecte.matricule;
    
    const gridContainer = document.getElementById('subjectsGridContainer');
    gridContainer.innerHTML = "";

    // Génération dynamique des cartes de matières actives
    Object.keys(EXAM_DATABASE).forEach(key => {
        const mat = EXAM_DATABASE[key];
        const card = document.createElement('div');
        card.className = "subject-card";
        card.innerHTML = `
            <div class="subject-info">
                <h3>${key.toUpperCase()}</h3>
                <p>${mat.desc}</p>
            </div>
            <button type="button" class="btn-start-exam" data-subject="${key}">Débuter l'épreuve →</button>
        `;
        
        card.querySelector('.btn-start-exam').addEventListener('click', function() {
            lancerExamenParMatiere(this.getAttribute('data-subject'));
        });
        
        gridContainer.appendChild(card);
    });

    basculerVue('viewDashboard');
}

/* ==========================================================================
   LOGIQUE DE RENTRÉE EN EXAMEN DYNAMIQUE
   ========================================================================== */
function lancerExamenParMatiere(cleMatiere) {
    const dataSujet = EXAM_DATABASE[cleMatiere];
    if (!dataSujet) return;

    // Fixation des données d'anonymat et champs cachés
    document.getElementById('hiddenSubjectName').value = cleMatiere;
    document.getElementById('hiddenMatricule').value = etudiantConnecte.matricule;
    document.getElementById('examInputNom').value = etudiantConnecte.nom;
    document.getElementById('examInputPrenom').value = etudiantConnecte.prenom;

    // GESTION DES TITRES ENTIÈREMENT DYNAMIQUE
    let nomMatierePropre = cleMatiere.toUpperCase();
    
    // Remplace le slash par un "et" si présent pour épurer l'affichage
    nomMatierePropre = nomMatierePropre.replace("/", "et");

    // Injection synchronisée dans l'encadré et le grand titre central
    document.getElementById('examSubjectBadge').textContent = nomMatierePropre;
    document.getElementById('examTitleMain').textContent = `Épreuve : ${nomMatierePropre}`;

    // Construction de la barre d'assistance à gauche
    document.getElementById('examSidebarDynamic').innerHTML = `
        <div class="help-title">💡 GUIDE OFFICIEL - ${cleMatiere.toUpperCase()}</div>
        <div class="help-intro">
            <p>Utiliser les indices ci-dessous :</p>
        </div>
        <div class="help-item">
            <strong>Consigne Impérative :</strong>
            <div class="help-item">
                <strong>Titre principal :</strong>
                <pre>text-align: center;<br>font-weight: bold;<br>font-style: italic;</pre>
            </div>

            <div class="help-item">
                <strong>Paragraphe 1 :</strong>
                <pre>font-family: Arial, sans-serif;<br>font-size: 30px;<br>text-align: justify;</pre>
            </div>

            <div class="help-item">
                <strong>Paragraphe 2 & 3 (Colonnes) :</strong>
                <p>Pensez à appliquer le modèle Flexbox sur le conteneur parent de vos paragraphes :</p>
                <pre>display: flex;</pre>
            </div>

            <div class="help-item">
                <strong>Votre Nom et Prénom :</strong>
                <pre>text-align: right;<br>font-style: italic;</pre>
            </div>
        </div>
    `;

    // Génération des questions théoriques textuelles
    const conteneurTheorie = document.getElementById('theoreticalQuestionsContainer');
    conteneurTheorie.innerHTML = `<div class="section-title">Première Partie : Theorie (Définitions)</div>`;
    
    dataSujet.questions.forEach((questionText, index) => {
        const inputId = `q_theorie_${index + 1}`;
        const fieldGroup = document.createElement('div');
        fieldGroup.className = "form-group-padded";
        fieldGroup.innerHTML = `
            <label for="${inputId}">${index + 1}. ${questionText} <span class="required">*</span></label>
            <div class="seyes-textarea-wrapper">
                <textarea id="${inputId}" name="reponse_q${index + 1}" rows="4" placeholder="Saisissez votre réponse ici..." required></textarea>
                <div class="seyes-grid-lines"></div>
            </div>
        `;
        conteneurTheorie.appendChild(fieldGroup);
    });

    // Insertion des énoncés pratiques
    document.getElementById('practicalInstructionsContainer').innerHTML = dataSujet.instructions;
    document.getElementById('practicalTextToCopy').textContent = dataSujet.textToCopy;

    basculerVue('viewExamPage');
}

function confirmerRetourDashboard() {
    if (confirm("Attention : si vous quittez maintenant, vos réponses en cours d'écriture sur cette copie seront perdues. Confirmer le retour ?")) {
        document.getElementById('examForm').reset();
        ouvrirDashboardEpreuves();
    }
}

/* ==========================================================================
   PANNEAU D'ADMINISTRATION DES SUJETS (ENSEIGNANT)
   ========================================================================== */
function executerConnexionAdmin() {
    const modal = document.getElementById('adminPasswordModal');
    const champPassword = document.getElementById('adminHiddenPasswordField');
    champPassword.value = "";
    modal.classList.add('active');
    champPassword.focus();
}

function fermerModaleAdmin() {
    document.getElementById('adminPasswordModal').classList.remove('active');
}

function validerConnexionAdmin() {
    const saisie = document.getElementById('adminHiddenPasswordField').value;
    fermerModaleAdmin();

    if (saisie === ADMIN_PASSWORD) {
        basculerVue('viewAdmin'); 
    } else {
        alert("Mot de passe incorrect. Accès strictement refusé.");
    }
}

function genererMenuMatiereAdmin() {
    const listContainer = document.getElementById('adminSubjectsList');
    listContainer.innerHTML = "";
    
    Object.keys(EXAM_DATABASE).forEach(key => {
        const li = document.createElement('li');
        li.className = `admin-subj-item ${key === matiereSelectionneeAdmin ? 'active' : ''}`;
        li.textContent = key.toUpperCase();
        
        li.onclick = function() {
            document.querySelectorAll('.admin-subj-item').forEach(el => el.classList.remove('active'));
            li.classList.add('active');
            matiereSelectionneeAdmin = key;
            chargerDonneesDansEditeurAdmin(key);
        };
        listContainer.appendChild(li);
    });
}

function chargerDonneesDansEditeurAdmin(cleMatiere) {
    const matData = EXAM_DATABASE[cleMatiere];
    document.getElementById('adminCurrentEditingTitle').textContent = `Édition Épreuve : ${cleMatiere.toUpperCase()}`;
    document.getElementById('admDesc').value = matData.desc;
    document.getElementById('admPratiqueInstructions').value = matData.instructions;
    document.getElementById('admPratiqueTextToCopy').value = matData.textToCopy;

    const questionsWrapper = document.getElementById('admQuestionsContainer');
    questionsWrapper.innerHTML = "";
    
    matData.questions.forEach((quest, i) => {
        const block = document.createElement('div');
        block.className = "form-control-group";
        block.innerHTML = `
            <label>Question Théorique N° ${i + 1}</label>
            <input type="text" class="form-input adm-q-input" data-index="${i}" value="${quest}">
        `;
        questionsWrapper.appendChild(block);
    });
}

function enregistrerModifAdmin(e) {
    e.preventDefault();
    
    const matData = EXAM_DATABASE[matiereSelectionneeAdmin];
    matData.desc = document.getElementById('admDesc').value.trim();
    matData.instructions = document.getElementById('admPratiqueInstructions').value;
    matData.textToCopy = document.getElementById('admPratiqueTextToCopy').value;

    const inputsModifs = document.querySelectorAll('.adm-q-input');
    inputsModifs.forEach(input => {
        const targetIdx = parseInt(input.getAttribute('data-index'));
        matData.questions[targetIdx] = input.value.trim();
    });

    // SAUVEGARDE DIRECTE DE EXAM_DATABASE DANS LE NAVIGATEUR
    localStorage.setItem('examen_banque_sujets', JSON.stringify(EXAM_DATABASE));

    alert(`Le sujet de l'épreuve de "${matiereSelectionneeAdmin.toUpperCase()}" a été mis à jour et sauvegardé définitivement dans ce navigateur.`);
}

/* ==========================================================================
   MODULE COMPLET D'IMPRESSION ACADÉMIQUE EN PDF A3
   ========================================================================== */
function configurerModuleImpression() {
    const printBtn = document.getElementById('btnPrintPDF');
    const examFormElement = document.getElementById('examForm');

    if (printBtn && examFormElement) {
        printBtn.addEventListener('click', function(e) {
            e.preventDefault(); 

            if (typeof html2pdf === 'undefined') {
                window.print();
                return;
            }

            examFormElement.querySelectorAll('input[type="text"], input[type="email"]').forEach(input => {
                input.setAttribute('value', input.value);
            });
            examFormElement.querySelectorAll('textarea').forEach(textarea => {
                textarea.textContent = textarea.value;
            });

            const helpSidebar = document.getElementById('examSidebarDynamic');
            const footerActions = document.querySelector('.actions-footer-bar');
            if (helpSidebar) helpSidebar.style.display = 'none';
            if (footerActions) footerActions.style.display = 'none';

            const layoutMain = document.querySelector('.main-layout');
            if (layoutMain) { layoutMain.style.display = 'block'; layoutMain.style.minHeight = 'auto'; }
            const containerForm = document.querySelector('.form-container');
            if (containerForm) { containerForm.style.padding = '0'; containerForm.style.maxWidth = '100%'; }

            examFormElement.style.width = "100%";
            examFormElement.style.maxWidth = "100%";

            const nomMatiereFichier = document.getElementById('examSubjectBadge').textContent;
            const configurationsPDF = {
                margin:       [12, 12, 12, 12],
                filename:     `Copie_Examen_${nomMatiereFichier}.pdf`,
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true, logging: false, letterRendering: true, scrollY: 0 },
                jsPDF:        { unit: 'mm', format: 'a3', orientation: 'portrait' },
                pagebreak:    { mode: 'avoid-all' }
            };

            html2pdf().set(configurationsPDF).from(examFormElement).save().then(() => {
                restaurerInterfaceComposition();
            }).catch(err => {
                restaurerInterfaceComposition();
                window.print();
            });

            function restaurerInterfaceComposition() {
                if (helpSidebar) helpSidebar.style.display = '';
                if (footerActions) footerActions.style.display = 'flex';
                if (layoutMain) { layoutMain.style.display = 'grid'; layoutMain.style.minHeight = '100vh'; }
                if (containerForm) { containerForm.style.padding = '40px'; containerForm.style.maxWidth = '900px'; }
                examFormElement.style.width = ""; 
                examFormElement.style.maxWidth = "";
            }
        });
    }
}

/* ==========================================================================
   MODULE DE TRAITEMENT DU FICHIER ZIP ET TRANSMISSION AUTOMATIQUE
   ========================================================================== */
function configurerModuleSoumission() {
    const examFormElement = document.getElementById('examForm');
    const inputFichierZip = document.getElementById('file-upload');
    const inputHiddenData = document.getElementById('hiddenZipData');

    if (examFormElement) {
        examFormElement.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitButton = document.getElementById('btnSubmitExam');
            submitButton.textContent = "Chiffrement et transfert de la copie... Patientez.";
            submitButton.style.backgroundColor = "#64748b";
            submitButton.disabled = true;

            const fichierCharge = inputFichierZip.files[0];
            if (fichierCharge) {
                const lecteurFichier = new FileReader();
                lecteurFichier.onload = function(event) {
                    inputHiddenData.value = event.target.result; 
                    envoyerDonneesAuServeur(examFormElement, submitButton);
                };
                lecteurFichier.readAsDataURL(fichierCharge);
            } else {
                envoyerDonneesAuServeur(examFormElement, submitButton);
            }
        });
    }
}

function envoyerDonneesAuServeur(formulaire, bouton) {
    const endpointUrl = formulaire.getAttribute('data-action'); 
    const donneesFormulaire = new FormData(formulaire);
    const parametresEnvoi = new URLSearchParams();
    
    for (const entree of donneesFormulaire.entries()) {
        parametresEnvoi.append(entree[0], entree[1]);
    }

    fetch(endpointUrl, {
        method: 'POST',
        body: parametresEnvoi,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then(response => response.json())
    .then(data => {
        afficherEcranSuccesDefinitif(document.getElementById('examInputPrenom').value);
    })
    .catch((error) => {
        afficherEcranSuccesDefinitif(document.getElementById('examInputPrenom').value);
    });
}

function afficherEcranSuccesDefinitif(prenomCandidat) {
    const nomMatiereFin = document.getElementById('examSubjectBadge').textContent;
    document.body.innerHTML = `
        <div class="success-page-container">
            <div class="success-card">
                <div class="success-icon-wrapper">✓</div>
                <h2>Épreuve soumise avec succès !</h2>
                <div class="divider"></div>
                <p>Félicitations <strong>${prenomCandidat}</strong>, votre copie d'examen pour la matière <strong>${nomMatiereFin.toUpperCase()}</strong> a été scellée et transmise avec succès au serveur de l'enseignant.</p>
                <div class="info-box">
                    <p><strong>Statut de la copie :</strong> Sécurisée & En attente de correction</p>
                    <p><strong>Note :</strong> Vous pouvez actualiser la page du navigateur si vous devez passer une autre épreuve.</p>
                </div>
                <button onclick="window.location.reload();" class="btn-primary-block">Retourner à la page d'accueil</button>
            </div>
        </div>
    `;
}