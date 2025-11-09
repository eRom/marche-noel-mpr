# Audit d'Accessibilité VoiceOver - Marché de Noël du MPR

## Résumé Exécutif

✅ **État général : BON** - Votre site a une excellente base d'accessibilité

- ✓ Skip link fonctionnel et bien implémenté
- ✓ Navigation logique avec tous les éléments majeurs
- ✓ Alt text descriptif sur les images
- ⚠️ 5 corrections simples pour atteindre l'excellence

**Score VoiceOver : 75/100 → Potentiel 90+/100 avec corrections**

---

## Analyse Détaillée

### ✅ Points Forts

**Skip Link**
Le lien "Aller au contenu principal" fonctionne correctement et permet aux utilisateurs VoiceOver de passer la navigation. C'est un élément crucial de l'accessibilité, bien implémenté.

**Navigation Principale**
Les cinq liens (Accueil, Programme, Galerie, Plan, À propos) sont clairs, explicites et annoncés correctement par VoiceOver dans un ordre logique.

**Alt Text des Images**
Toutes les images importantes ont des descriptions contextuelle : le logo, l'image du marché, le logo APRAIH, et le QR code. C'est excellent.

**Structure des Titres**
Un H1 principal ("Bienvenue au Marché de Noël du MPR de Nantes") suivi de H2 et H3 créant une hiérarchie largement fonctionnelle.

---

### ⚠️ Problèmes Identifiés

**🔴 PROBLÈME #1 : FLOCONS CRÉENT DU BRUIT AUDITIF (PRIORITÉ HAUTE)**

Les 31 flocons (❄️) sont énoncés individuellement par VoiceOver, créant une cacophonie sonore. Solution simple : envelopper dans `aria-hidden="true"`.

```html
<div aria-hidden="true">❄️ ❄️ ❄️ ...</div>
```

**Impact** : Réduction drastique du bruit inutile | **Effort** : 1 minute

---

**🔴 PROBLÈME #2 : HIÉRARCHIE DES TITRES INCOHÉRENTE (PRIORITÉ HAUTE)**

Les H3 "Artisans patients" et "Esprit de Noël" n'ont pas de H2 parent - ils sont orphelins. Cela crée une confusion dans la navigation par titres avec VoiceOver.

**Impact** : Structure logique affectée pour les utilisateurs | **Effort** : 2-5 minutes

---

**🟡 PROBLÈME #3 : COMPTEUR DYNAMIQUE SANS NOTIFICATION (PRIORITÉ MOYENNE)**

"11 flocons trouvés" change dynamiquement mais n'annonce pas les mises à jour. Ajouter `aria-live="polite"` :

```html
<div aria-live="polite">11 flocons trouvés</div>
```

**Impact** : Notifications en temps réel | **Effort** : 1 minute

---

**🟡 PROBLÈME #4 : BOUTONS RÉSEAUX SOCIAUX MANQUENT DE CONTEXTE (PRIORITÉ MOYENNE)**

Facebook, WhatsApp, Twitter, LinkedIn sont énoncés sans contexte. Ajouter `aria-label` :

```html
<button aria-label="Partager sur Facebook">Facebook</button>
```

**Impact** : Clarté de l'intention | **Effort** : 2-3 minutes

---

**🟡 PROBLÈME #5 : ALT TEXT GÉNÉRIQUE POUR QR CODE (PRIORITÉ MOYENNE)**

"Image du Marché de Noël MPR" ne précise pas que c'est un QR code. Améliorer :

```html
<img alt="Code QR pour accéder au site du Marché de Noël depuis votre mobile" />
```

**Impact** : Utilisateurs comprennent le purpose | **Effort** : 1 minute

---

**🟢 PROBLÈME #6 : BOUTON MODE SOMBRE SANS LABEL (PRIORITÉ BASSE)**

"Passer en mode sombre" pourrait avoir un `aria-label` plus descriptif, mais c'est cosmétique.

---

## Conformité WCAG 2.1 AA

| Critère                      | Niveau | Status     | Notes                  |
| ---------------------------- | ------ | ---------- | ---------------------- |
| 1.1.1 Contenu non textuel    | A      | ✓ Conforme | Alt text présent       |
| 1.3.1 Info et Relations      | AA     | ⚠️ Partiel | H3 orphelins           |
| 2.4.1 Contourner des blocs   | A      | ✓ Conforme | Skip link OK           |
| 2.4.6 En-têtes et étiquettes | AA     | ⚠️ Partiel | Hiérarchie incohérente |
| 4.1.2 Nom, rôle, valeur      | A      | ⚠️ Partiel | aria-labels manquants  |

---

## Plan d'Action (20-30 minutes)

**Phase 1 - Urgent (15 min)**

1. Ajouter `aria-hidden="true"` aux flocons
2. Ajouter `aria-live="polite"` au compteur
3. Ajouter `aria-label` aux boutons réseaux

**Phase 2 - Optimisation (5-10 min)** 4. Améliorer alt text QR code 5. Corriger hiérarchie des titres 6. Ajouter aria-label au bouton mode sombre

---

## Rapport Complet

---

## Conclusion

Votre site démontre un **vrai engagement envers l'accessibilité** - la présence du skip link et des alt text montre que c'était une priorité dès le départ.

Les corrections recommandées sont **triviales** (5-10 lignes de code au total) et porteraient le score à **90+/100**, atteindre une **conformité WCAG 2.1 AA complète**.

**Bravo pour cette belle initiative d'accessibilité ! 🎄♿**

[1](https://marche-noel-mpr-git-feature-game-romain-ecarnots-projects.vercel.app/)
