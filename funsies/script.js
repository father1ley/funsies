const questions = [
  {
    q: "It's Sunday night. 10 pieces of homework are due tomorrow morning. You:",
    opts: [
      { t: "Finished it Friday like a functioning human", v: 0 },
      { t: "Doing it now, mildly panicking", v: 1 },
      { t: "Take a nap first, deal with it \"later\"", v: 2 },
      { t: "Cry and wait for a gadget to fix it", v: 3 }
    ]
  },
  {
    q: "Test results are back. Your score:",
    opts: [
      { t: "95+, obviously", v: 0 },
      { t: "Solid 70s, no drama", v: 1 },
      { t: "30s, \"at least I tried\"", v: 2 },
      { t: "Zero. A literal zero. Framed on the wall at this point", v: 3 }
    ]
  },
  {
    q: "Gian invites the whole neighborhood to his \"concert.\" You:",
    opts: [
      { t: "Politely decline, no explanation needed", v: 0 },
      { t: "Go, suffer quietly through it", v: 1 },
      { t: "Go, get punched for saying it's bad", v: 2 },
      { t: "Get punched, then show up again next week anyway", v: 3 }
    ]
  },
  {
    q: "Your aim, coordination, and general physical skill:",
    opts: [
      { t: "Genuinely solid, practiced regularly", v: 0 },
      { t: "Average, nothing special", v: 1 },
      { t: "Bad at everything except one absurdly specific skill", v: 2 },
      { t: "Worst in class, but can land one perfect shot with your eyes closed once a year", v: 3 }
    ]
  },
  {
    q: "Shizuka walks by. Your internal state:",
    opts: [
      { t: "Normal. She's a person, you're a person", v: 0 },
      { t: "A little nervous, that's it", v: 1 },
      { t: "Already planning the wedding", v: 2 },
      { t: "Already planning the wedding AND have peeked at her bathing at least once", v: 3 }
    ]
  },
  {
    q: "Doraemon pulls a gadget out of the pocket for your problem. You:",
    opts: [
      { t: "Use it once, responsibly, learn nothing needed", v: 0 },
      { t: "Use it a couple times, learn a small lesson", v: 1 },
      { t: "Immediately abuse it for something unrelated", v: 2 },
      { t: "Abuse it so hard it becomes a cautionary tale by episode's end", v: 3 }
    ]
  },
  {
    q: "Napping opportunities you've taken advantage of:",
    opts: [
      { t: "Bed, at night, like a normal person", v: 0 },
      { t: "Occasional nap on a lazy weekend", v: 1 },
      { t: "Regularly asleep through most of class", v: 2 },
      { t: "Could fall asleep mid-sentence, mid-punch, mid-anything", v: 3 }
    ]
  },
  {
    q: "Someone starts bullying you. Your move:",
    opts: [
      { t: "Stand up for yourself calmly", v: 0 },
      { t: "Say something back, immediately regret it", v: 1 },
      { t: "Cry on the spot, no build-up", v: 2 },
      { t: "Cry, run home, still somehow lose anyway", v: 3 }
    ]
  },
  {
    q: "Realistic future career prospects, be honest:",
    opts: [
      { t: "Doctor, engineer, something respectable", v: 0 },
      { t: "Stable desk job, no complaints", v: 1 },
      { t: "Unclear, but you'll survive", v: 2 },
      { t: "Married somehow anyway, career TBD, vibes only", v: 3 }
    ]
  },
  {
    q: "Your dad grounds you for something you deserved. You:",
    opts: [
      { t: "Take it, actually learn something", v: 0 },
      { t: "Sulk a little, get over it", v: 1 },
      { t: "Complain to your best friend immediately", v: 2 },
      { t: "Full meltdown, tears, blame everyone but yourself", v: 3 }
    ]
  },
  {
    q: "Your friends made plans without telling you. You:",
    opts: [
      { t: "Fine, whatever, not everything needs you", v: 0 },
      { t: "A little hurt, move on within the hour", v: 1 },
      { t: "Deeply wounded, bringing it up later for sure", v: 2 },
      { t: "Personal betrayal, thinking about it for a full week", v: 3 }
    ]
  },
  {
    q: "Your general life motto:",
    opts: [
      { t: "Work hard now, thank yourself later", v: 0 },
      { t: "Balance is key", v: 1 },
      { t: "\"I'll figure it out somehow\"", v: 2 },
      { t: "\"Someone else will figure it out for me somehow\"", v: 3 }
    ]
  },
  {
    q: "When you actually win at something:",
    opts: [
      { t: "Happens often, no big deal", v: 0 },
      { t: "Happens sometimes, feels earned", v: 1 },
      { t: "Rare, and you savor every second", v: 2 },
      { t: "Once in a blue moon, and it's always dumb luck", v: 3 }
    ]
  }
];

const verdicts = [
  { max: 19, title: "Dekisugi Detected", body: "Suspiciously competent. You did this whole quiz without crying once, which honestly says a lot. Somewhere, a raccoon-shaped robot is unemployed because you don't need him." },
  { max: 39, title: "Mostly Holding It Together", body: "You have your moments, but you're basically functional. A little lazy, a little dramatic, but nobody's writing a cautionary tale about you yet." },
  { max: 59, title: "Nobita-Curious", body: "There's real potential here. A nap habit forming, a crush going unmanaged, a grade situation that could go either way. Keep at it." },
  { max: 79, title: "Certified Nobita", body: "Grades: concerning. Aim: inconsistent except for that one miracle shot. Crush: unresolved for years. You're basically one gadget request away from the full experience." },
  { max: 100, title: "Doraemon Should Just Retire", body: "There is nothing left to teach you. You cry, you nap, you get 0 on tests, you get punched by a Gian-equivalent, and you'd still trade it all for one glance from your Shizuka. Full marks. Unfortunately." }
];

let current = 0;
let answers = new Array(questions.length).fill(null);

function showScreen(id){
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function startQuiz(){
  current = 0;
  answers = new Array(questions.length).fill(null);
  showScreen('screen-quiz');
  renderQuestion();
}

function renderQuestion(){
  const q = questions[current];
  document.getElementById('q-counter').textContent = `Question ${current + 1} / ${questions.length}`;
  document.getElementById('pocket-fill').style.width = `${(current / questions.length) * 100}%`;
  document.getElementById('q-percent-label').textContent = `${Math.round((current / questions.length) * 100)}%`;
  document.getElementById('q-text').textContent = q.q;
  document.getElementById('back-btn').disabled = current === 0;

  const optsWrap = document.getElementById('q-options');
  optsWrap.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'opt';
    if (answers[current] === i) btn.classList.add('chosen');
    btn.textContent = opt.t;
    btn.onclick = () => selectAnswer(i);
    optsWrap.appendChild(btn);
  });
}

function selectAnswer(i){
  answers[current] = i;
  if (current < questions.length - 1){
    current++;
    renderQuestion();
  } else {
    showResult();
  }
}

function goBack(){
  if (current > 0){
    current--;
    renderQuestion();
  }
}

function showResult(){
  const total = answers.reduce((sum, ansIdx, qi) => {
    if (ansIdx === null) return sum;
    return sum + questions[qi].opts[ansIdx].v;
  }, 0);
  const maxScore = questions.length * 3;
  const pct = Math.round((total / maxScore) * 100);

  const verdict = verdicts.find(v => pct <= v.max) || verdicts[verdicts.length - 1];

  showScreen('screen-result');
  document.getElementById('verdict-title').textContent = verdict.title;
  document.getElementById('verdict-body').textContent = verdict.body;

  animateGauge(pct);
}

function animateGauge(pct){
  const arcLength = 251; // approximate length of the semicircle path
  const arc = document.getElementById('gauge-arc');
  const needle = document.getElementById('gauge-needle');
  const pctText = document.getElementById('gauge-pct-text');

  arc.setAttribute('stroke-dasharray', `${arcLength}`);
  arc.setAttribute('stroke-dashoffset', `${arcLength}`);

  let start = null;
  const duration = 900;

  function step(ts){
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const currentPct = pct * eased;

    const offset = arcLength - (arcLength * currentPct / 100);
    arc.setAttribute('stroke-dashoffset', `${offset}`);

    const angle = -90 + (currentPct / 100) * 180;
    const rad = (angle * Math.PI) / 180;
    const len = 78;
    const x2 = 120 + len * Math.cos(rad);
    const y2 = 130 + len * Math.sin(rad);
    needle.setAttribute('x2', x2);
    needle.setAttribute('y2', y2);

    pctText.textContent = `${Math.round(currentPct)}%`;

    if (progress < 1){
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}

function restartQuiz(){
  showScreen('screen-intro');
}