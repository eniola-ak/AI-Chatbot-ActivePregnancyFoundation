export interface ScreeningQuestion {
  id: string;
  text: string;
  yesAction: 'refer_immediately' | 'refer_and_continue' | 'note_and_continue';
  explainTerm: string;
}

// Preganancy Screening Questions drawn from GAQ-P

export const PREGNANCY_SCREENING_QUESTIONS: ScreeningQuestion[] = [
  {
    id: 'preg-intro',
    text: "Before we dive in, I'd like to run through a few quick health questions just to make sure I point you in the right direction 😊. There are no wrong answers!\n\nDo you have any mild, moderate, or severe respiratory or cardiovascular disease? For example, chronic bronchitis or a heart condition?",
    yesAction: 'refer_immediately',
    explainTerm: "cardiovascular disease",
  },
  {
    id: 'preg-01-b',
    text: "Do you have epilepsy that has been difficult to manage or control lately?",
    yesAction: 'refer_immediately',
    explainTerm: "epilepsy",
  },
  {
    id: 'preg-01-c',
    text: "Do you have Type 1 diabetes that isn't stable, or is your blood sugar outside of your target ranges?",
    yesAction: 'refer_immediately',
    explainTerm: "diabetes type 1",
  },
  {
    id: 'preg-01-d',
    text: "Do you have thyroid disease that isn't stable, or is your thyroid function outside of your target ranges?",
    yesAction: 'refer_immediately',
    explainTerm: "thyroid",
  },
  {
    id: 'preg-01-e',
    text: "Are you currently experiencing an eating disorder or malnutrition? For example, struggling with your relationship with food or not getting enough nutrition?",
    yesAction: 'refer_immediately',
    explainTerm: "eating disorder",

  },
  {
    id: 'preg-01-f',
    text: "Are you expecting a multiple pregnancy such as twins at 28 weeks or more, or triplets or higher at any stage?",
    yesAction: 'refer_immediately',
    explainTerm: "multiple pregnancy",
  },
  {
    id: 'preg-01-g',
    text: "Have you been told you have a low red blood cell count (anaemia), and are you experiencing high levels of fatigue or light-headedness because of it?",
    yesAction: 'refer_immediately',
    explainTerm: "anaemia"
  },
  {
    id: 'preg-01-h',
    text: "How has your blood pressure been during this pregnancy? Has your midwife or doctor mentioned pre-eclampsia, gestational hypertension, or any blood pressure that's been hard to control?",
    yesAction: 'refer_immediately',
    explainTerm: "pre-eclampsia",
  },
  {
    id: 'preg-01-i',
    text: "Have you been told your baby is growing slowly (sometimes called intrauterine growth restriction)?",
    yesAction: 'refer_immediately',
    explainTerm: "intrauterine growth restriction",
  },
  {
    id: 'preg-01-j',
    text: "Have you had any unexplained bleeding, ruptured membranes, or signs of labour before 37 weeks?",
    yesAction: 'refer_immediately',
    explainTerm: "ruptured membranes",
  },
  {
    id: 'preg-01-k',
    text: "Have you been told your placenta is partially or completely covering your cervix (placenta praevia)?",
    yesAction: 'refer_immediately',
    explainTerm: "placenta praevia",
  },
  {
    id: 'preg-01-l',
    text: "Do you have a weak cervix (sometimes called cervical incompetence)?",
    yesAction: 'refer_immediately',
    explainTerm: "cervical incompetence",
  },
  {
    id: 'preg-01-m',
    text: "Do you have a stitch or tape in place to reinforce your cervix (a cerclage)?",
    yesAction: 'refer_immediately',
    explainTerm: "cerclage",
  },
  {
    id: 'preg-02-a',
    text: "Have you had two or more miscarriages (losses before 20 weeks)?",
    yesAction: 'refer_and_continue',
    explainTerm: "miscarriage",
  },
  {
    id: 'preg-02-b',
    text: "Have you had a preterm birth in a previous pregnancy where your baby arrived before 37 weeks?",
    yesAction: 'refer_and_continue',
    explainTerm: "premature birth / preterm birth",
  },
  {
    id: 'preg-03',
    text: "Is there any other medical condition you have that might affect your ability to be physically active during pregnancy? If yes, feel free to describe it briefly.",
    yesAction: 'refer_and_continue',
  },
  {
    id: 'preg-04',
    text: "And finally,  is there any other reason you're feeling concerned about physical activity during your pregnancy? It would be really great to know!",
    yesAction: 'note_and_continue',
  },
];

//POSTNATAL SCREENING ( from: International Delphi study of clinical and exercise professionals)

export const POSTNATAL_SCREENING_QUESTIONS: ScreeningQuestion[] = [
  {
    id: 'post-intro',
    text: "Congratulations on your little one! 🎉 Before we get into the good stuff, I'd like to run through a quick health check to make sure you're ready to get moving safely.\n\nHave you had any loss of consciousness for any reason since giving birth?",
    yesAction: 'refer_immediately',
    explainTerm: "loss of consciousness",
  },
  {
    id: 'post-02',
    text: "Have you noticed any problems with coordination, muscle weakness, or balance?",
    yesAction: 'refer_immediately',
  },
  {
    id: 'post-03',
    text: "Have you had any pain, swelling or redness in your legs or felt suddenly short of breath for no obvious reason? These can sometimes be signs of a blood clot or DVT (deep vein thrombosis).",
    yesAction: 'refer_immediately',
    explainTerm: "dvt",
  },
  {
    id: 'post-04',
    text: "Is your blood pressure elevated (above 140/90) and not yet under control? This is sometimes called hypertension.",
    yesAction: 'refer_immediately',
    explainTerm: "hypertension",
  },
  {
    id: 'post-05',
    text: "Are you currently experiencing an eating disorder or malnutrition?",
    yesAction: 'refer_immediately',
    explainTerm: "eating disorder",
  },
  {
    id: 'post-06',
    text: "Have you been diagnosed with a heart condition called postpartum cardiomyopathy after childbirth?",
    yesAction: 'refer_immediately',
    explainTerm: "postpartum cardiomyopathy",
  },
  {
    id: 'post-07',
    text: "Have you had any new chest pain, dizziness, or stroke-like symptoms — such as face drooping, arm weakness, or slurred speech — during everyday activities or at rest?",
    yesAction: 'refer_immediately',
  },
  {
    id: 'post-08',
    text: "Are you experiencing severe abdominal pain?",
    yesAction: 'refer_immediately',
    explainTerm: "abdominal pain",
  },
  {
    id: 'post-09',
    text: "Do you get chest pain, dizziness, heart palpitations or feel lightheaded specifically during exercise?",
    yesAction: 'refer_immediately',
    explainTerm: "heart palpitations"
  },
  {
    id: 'post-10',
    text: "Do you have any breathing difficulties at rest that don't improve with medication?",
    yesAction: 'refer_immediately',
  },
  {
    id: 'post-11',
    text: "Do you have kidney disease?",
    yesAction: 'refer_and_continue',
  },
  {
    id: 'post-12',
    text: "Are you experiencing excessive fatigue beyond normal tiredness amd rest doesn't seem to help much?",
    yesAction: 'refer_and_continue',
  },
  {
    id: 'post-13',
    text: "Do you have a severe infection right now, with fever, body aches, or swollen glands?",
    yesAction: 'refer_immediately',
  },
  {
    id: 'post-14',
    text: "Have you had a fracture or significant injury recently that might affect your movement or ability to exercise?",
    yesAction: 'refer_and_continue',
  },
  {
    id: 'post-15',
    text: "If you had a caesarean section, is there pain at the incision site that gets worse when you move or exercise?",
    yesAction: 'refer_and_continue',
    explainTerm: "caesarean birth",
  },
  {
    id: 'post-16',
    text: "Do you have any vaginal bleeding that doesn't seem like your normal period?",
    yesAction: 'refer_immediately',
    explainTerm: "vaginal bleeding",
  },
  {
    id: 'post-17',
    text: "Do you have any other medical condition that might affect your ability to be physically active after having your baby? If yes, feel free to describe it briefly.",
    yesAction: 'refer_and_continue',
  },
  {
    id: 'post-18',
    text: "And the last one! are you feeling anxious or worried about returning to or increasing your physical activity after birth? It is completely normal if you do! 💛",
    yesAction: 'note_and_continue',
  },
];