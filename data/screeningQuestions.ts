// src/data/screeningQuestions.ts
//
// Pregnancy questions: drawn directly from GAQ-P
// Postnatal questions: drawn from the International Delphi study and POGP leaflets.
//
// Each question has a yesAction:
//   'refer_immediately'  → stop screening, tell user to see GP/midwife before any activity
//   'refer_and_continue' → flag the concern, keep going through remaining questions
//   'note_and_continue'  → acknowledge (e.g. anxiety question), then continue to chat

export interface ScreeningQuestion {
  id: string;
  text: string;
  yesAction: 'refer_immediately' | 'refer_and_continue' | 'note_and_continue';
}

// ── PREGNANCY SCREENING (GAQ-P) ───────────────────────────────────────────────

export const PREGNANCY_SCREENING_QUESTIONS: ScreeningQuestion[] = [
  {
    id: 'preg-intro',
    text: "Before we get into the fun stuff, I'd love to ask you a few quick health questions — it only takes a minute and helps me give you the right guidance. No wrong answers at all! 😊\n\nHas a doctor ever mentioned anything about your heart or lungs — like a heart condition, chronic bronchitis, or any breathing problems?",
    yesAction: 'refer_immediately',
  },
  {
    id: 'preg-01-b',
    text: "Do you have epilepsy, and has it been hard to manage lately?",
    yesAction: 'refer_immediately',
  },
  {
    id: 'preg-01-c',
    text: "Do you have Type 1 diabetes? If so, has your blood sugar been a bit up and down recently?",
    yesAction: 'refer_immediately',
  },
  {
    id: 'preg-01-d',
    text: "Have you been told you have a thyroid condition — and has it been tricky to keep under control?",
    yesAction: 'refer_immediately',
  },
  {
    id: 'preg-01-e',
    text: "Are you currently struggling with your relationship with food, or feeling like you might not be eating enough?",
    yesAction: 'refer_immediately',
  },
  {
    id: 'preg-01-f',
    text: "Are you expecting more than one baby — like twins at 28 weeks or more, or triplets at any stage?",
    yesAction: 'refer_immediately',
  },
  {
    id: 'preg-01-g',
    text: "Have you been told your iron levels are low (anaemia)? And if so, are you feeling really exhausted or dizzy because of it?",
    yesAction: 'refer_immediately',
  },
  {
    id: 'preg-01-h',
    text: "How has your blood pressure been during this pregnancy? Has your midwife or doctor mentioned anything like high blood pressure or pre-eclampsia?",
    yesAction: 'refer_immediately',
  },
  {
    id: 'preg-01-i',
    text: "Has your doctor or midwife said anything about your baby's growth — like that they might be growing a little slowly?",
    yesAction: 'refer_immediately',
  },
  {
    id: 'preg-01-j',
    text: "Have you had any bleeding, or has your midwife mentioned anything about early signs of labour or your waters?",
    yesAction: 'refer_immediately',
  },
  {
    id: 'preg-01-k',
    text: "Has anyone mentioned anything about where your placenta is sitting — like that it might be low or covering the cervix?",
    yesAction: 'refer_immediately',
  },
  {
    id: 'preg-01-l',
    text: "Have you been told your cervix is a little weak or short — sometimes called cervical incompetence?",
    yesAction: 'refer_immediately',
  },
  {
    id: 'preg-01-m',
    text: "Do you have a cervical stitch in place — sometimes called a cerclage — to help support your cervix?",
    yesAction: 'refer_immediately',
  },
  {
    id: 'preg-02-a',
    text: "Have you experienced two or more pregnancy losses before 20 weeks in the past?",
    yesAction: 'refer_and_continue',
  },
  {
    id: 'preg-02-b',
    text: "Have you had a baby arrive early — before 37 weeks — in a previous pregnancy?",
    yesAction: 'refer_and_continue',
  },
  {
    id: 'preg-03',
    text: "Is there anything else health-wise that you think might be worth mentioning — anything that could affect how you move or exercise during pregnancy?",
    yesAction: 'refer_and_continue',
  },
  {
    id: 'preg-04',
    text: "Last one, I promise! Is there anything else making you feel a bit nervous or unsure about being active during your pregnancy? Totally okay if there is — just good to know! 💛",
    yesAction: 'note_and_continue',
  },
];

// ── POSTNATAL SCREENING (GAQ-PP) ──────────────────────────────────────────────

export const POSTNATAL_SCREENING_QUESTIONS: ScreeningQuestion[] = [
  {
    id: 'post-intro',
    text: "Congratulations on your little one! 🎉 Before we get into the good stuff, I'd love to ask a few quick questions — just to make sure we get the activity guidance right for where you're at right now.\n\nSince giving birth, have you ever fainted or lost consciousness at any point?",
    yesAction: 'refer_immediately',
  },
  {
    id: 'post-02',
    text: "Have you noticed anything unusual with your balance, coordination, or muscle strength — like feeling unsteady on your feet?",
    yesAction: 'refer_immediately',
  },
  {
    id: 'post-03',
    text: "Have you had any pain, swelling or redness in your legs — or felt suddenly short of breath for no obvious reason? These can sometimes be signs of a blood clot.",
    yesAction: 'refer_immediately',
  },
  {
    id: 'post-04',
    text: "How has your blood pressure been since having your baby? Has it been on the higher side or hard to keep under control?",
    yesAction: 'refer_immediately',
  },
  {
    id: 'post-05',
    text: "Are you currently struggling with your relationship with food, or feeling like you might not be getting enough to eat?",
    yesAction: 'refer_immediately',
  },
  {
    id: 'post-06',
    text: "Has a doctor mentioned anything about your heart since you gave birth — like a condition called postpartum cardiomyopathy?",
    yesAction: 'refer_immediately',
  },
  {
    id: 'post-07',
    text: "Have you had any chest discomfort, dizziness, or anything that felt unusual — like facial drooping, arm weakness, or difficulty speaking?",
    yesAction: 'refer_immediately',
  },
  {
    id: 'post-08',
    text: "Are you having any pain in your tummy or abdomen that feels quite severe?",
    yesAction: 'refer_immediately',
  },
  {
    id: 'post-09',
    text: "When you do any physical activity, do you get chest pain, feel dizzy, or feel light-headed?",
    yesAction: 'refer_immediately',
  },
  {
    id: 'post-10',
    text: "Are you having any trouble breathing even when you're just resting — and it doesn't seem to improve?",
    yesAction: 'refer_immediately',
  },
  {
    id: 'post-11',
    text: "Have you been told you have kidney disease?",
    yesAction: 'refer_and_continue',
  },
  {
    id: 'post-12',
    text: "Are you feeling really exhausted — beyond the usual new baby tiredness — and rest doesn't seem to help much?",
    yesAction: 'refer_and_continue',
  },
  {
    id: 'post-13',
    text: "Are you currently unwell with a fever, body aches, or swollen glands?",
    yesAction: 'refer_immediately',
  },
  {
    id: 'post-14',
    text: "Have you had a fracture or injury recently that might affect your movement?",
    yesAction: 'refer_and_continue',
  },
  {
    id: 'post-15',
    text: "If you had a c-section — how is your scar feeling? Any pain around it, especially when you move?",
    yesAction: 'refer_and_continue',
  },
  {
    id: 'post-16',
    text: "Have you had any vaginal bleeding that doesn't seem like your normal period returning?",
    yesAction: 'refer_immediately',
  },
  {
    id: 'post-17',
    text: "Is there anything else health-wise you'd like to mention — anything that might affect how you get back into activity after having your baby?",
    yesAction: 'refer_and_continue',
  },
  {
    id: 'post-18',
    text: "And the very last one — how are you feeling about getting back to being active? Any worries or nerves about it? Completely normal if you do! 💛",
    yesAction: 'note_and_continue',
  },
];