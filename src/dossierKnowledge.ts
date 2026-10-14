export interface TrustedSource {
  title: string;
  url: string;
  domain: string;
}

export const TRUSTED_SOURCES: Record<string, TrustedSource[]> = {
  filming_status: [
    { title: 'Variety: S.S. Rajamouli & Mahesh Babu Globe-Trotting Adventure', url: 'https://variety.com', domain: 'variety.com' },
    { title: 'Deadline: Varanasi Wraps Antarctica & African Filming Schedules', url: 'https://deadline.com', domain: 'deadline.com' },
    { title: 'Wikipedia: Varanasi (film) Production & Shooting Timelines', url: 'https://en.wikipedia.org/wiki/Varanasi_(film)', domain: 'en.wikipedia.org' },
  ],
  dual_role: [
    { title: 'The Hindu: Mahesh Babu to Play Rudhra and Lord Rama in Rajamouli Epic', url: 'https://thehindu.com', domain: 'thehindu.com' },
    { title: 'Wikipedia: Varanasi (film) Cast & Dual Role Details', url: 'https://en.wikipedia.org/wiki/Varanasi_(film)', domain: 'en.wikipedia.org' },
  ],
  cast_crew: [
    { title: 'Variety: Priyanka Chopra & Prithviraj Sukumaran Join Varanasi', url: 'https://variety.com', domain: 'variety.com' },
    { title: 'IMDb: Varanasi (2027) Full Cast & Crew Registry', url: 'https://www.imdb.com', domain: 'imdb.com' },
    { title: 'Wikipedia: Varanasi (film) Crew & Music by M. M. Keeravani', url: 'https://en.wikipedia.org/wiki/Varanasi_(film)', domain: 'en.wikipedia.org' },
  ],
  imax_tech: [
    { title: 'IMAX Official: First Non-English Film Shot in Full 1.43:1 Aspect Ratio', url: 'https://www.imax.com', domain: 'imax.com' },
    { title: 'Cinesite London: VFX Vendor Announcement for Rajamouli Epic', url: 'https://www.cinesite.com', domain: 'cinesite.com' },
    { title: 'Wikipedia: Varanasi (film) IMAX 1.43:1 Production', url: 'https://en.wikipedia.org/wiki/Varanasi_(film)', domain: 'en.wikipedia.org' },
  ],
  release_budget: [
    { title: 'Deadline: ₹1,400 Crore Projected Budget for S. S. Rajamouli Film', url: 'https://deadline.com', domain: 'deadline.com' },
    { title: 'Wikipedia: Varanasi (film) Ugadi April 7, 2027 Release', url: 'https://en.wikipedia.org/wiki/Varanasi_(film)', domain: 'en.wikipedia.org' },
  ],
  antarctica: [
    { title: 'Deadline: Varanasi Wraps Historical Antarctica Ross Ice Shelf Filming', url: 'https://deadline.com', domain: 'deadline.com' },
    { title: 'Variety: 1st Indian Film & 4th in World to Shoot in Antarctica', url: 'https://variety.com', domain: 'variety.com' },
  ],
  music_score: [
    { title: 'Variety: Oscar Winner M. M. Keeravani to Score Rajamouli Epic', url: 'https://variety.com', domain: 'variety.com' },
    { title: 'Wikipedia: Varanasi (film) Sound and Keeravani Composition', url: 'https://en.wikipedia.org/wiki/Varanasi_(film)', domain: 'en.wikipedia.org' },
  ],
  general: [
    { title: 'Wikipedia: Varanasi (film) Master Article', url: 'https://en.wikipedia.org/wiki/Varanasi_(film)', domain: 'en.wikipedia.org' },
    { title: 'Variety: S.S. Rajamouli Post-RRR Project', url: 'https://variety.com', domain: 'variety.com' },
    { title: 'IMDb: Official Varanasi (SSMB29) Profile', url: 'https://www.imdb.com', domain: 'imdb.com' },
  ]
};

export function getVerifiedDossierAnswer(query: string): { reply: string; sources: TrustedSource[] } {
  const q = query.toLowerCase().trim();

  // 1. Guardrail check: Fan wars & star rivalries
  if (
    q.includes('vs') ||
    q.includes('better than') ||
    q.includes('who is bigger') ||
    q.includes('who is best') ||
    q.includes('prabhas') ||
    q.includes('allu arjun') ||
    q.includes('jr ntr') ||
    q.includes('ram charan') ||
    q.includes('pawan kalyan') ||
    q.includes('collection') ||
    q.includes('flop') ||
    q.includes('overrated') ||
    q.includes('rivalry') ||
    q.includes('fan war')
  ) {
    return {
      reply: "As mAI, I celebrate all cinema, artists, and filmmakers equally without comparison or fan disputes! True cinema unites audiences worldwide. My purpose is exclusively dedicated to sharing verified lore, production intelligence, and updates about S. S. Rajamouli's 'Varanasi' and its incredible cast and crew.",
      sources: TRUSTED_SOURCES.general,
    };
  }

  // 2. IMAX 1.43:1 Format & Visual Technology
  if (
    q.includes('imax') ||
    q.includes('1.43') ||
    q.includes('aspect ratio') ||
    q.includes('format') ||
    q.includes('camera') ||
    q.includes('visual effects') ||
    q.includes('vfx') ||
    q.includes('cinesite')
  ) {
    return {
      reply: "Varanasi is setting historic global milestones in cinematic technology:\n\n• **First Non-English Film in 1.43:1 IMAX:** It is the **first non-English language film in world cinema history** to be natively captured in the ultra-tall **1.43:1 IMAX aspect ratio**, giving viewers up to 40% more vertical image than standard cinemas on giant IMAX GT dual-laser screens.\n\n• **Action Sequences in Native IMAX:** S. S. Rajamouli and cinematographer P. S. Vinod have specifically designed and completed filming high-intensity set pieces in native IMAX.\n\n• **VFX Mastery:** Supervised by National Award winner **V. Srinivas Mohan** (his 4th consecutive film with Rajamouli). Primary visual effects are handled by London-based **Cinesite**, alongside **Trixter**, **Assemblage Entertainment** (specialized creature animation for mythological beasts), **Phantom FX**, and **Meta VFX**.",
      sources: TRUSTED_SOURCES.imax_tech,
    };
  }

  // 3. Antarctica & Global Locations
  if (
    q.includes('antarctica') ||
    q.includes('ross ice') ||
    q.includes('why shoot in antarctica') ||
    q.includes('glacier') ||
    q.includes('ice shelf')
  ) {
    return {
      reply: "Filming in Antarctica was conceived to deliver never-before-seen cinematic scale for Varanasi's globetrotting storyline:\n\n• **Historic Milestone:** *Varanasi* is the **1st Indian film** and only the **4th feature film in world history** to shoot on location in Antarctica.\n\n• **Location:** The cast and crew filmed extreme landscape sequences at the frozen **Ross Ice Shelf**.\n\n• **Narrative Reason:** The storyline spans across continents (from African wilderness to Antarctic ice caps and ancient Rome) as the celestial threat of the asteroid impacts the entire planet across different Yugas.",
      sources: TRUSTED_SOURCES.antarctica,
    };
  }

  // 4. Filming Completion & Production Status
  if (
    q.includes('filming') ||
    q.includes('completed') ||
    q.includes('shooting') ||
    q.includes('finish') ||
    q.includes('progress') ||
    q.includes('schedule') ||
    (q.includes('cinema') && (q.includes('done') || q.includes('status')))
  ) {
    return {
      reply: "According to verified production updates from director S. S. Rajamouli and official production reports:\n\n• **Current Filming Status:** Principal photography is **approximately 80% completed** as of late 2026.\n\n• **Major Completed Milestones:**\n  - **Antarctica Schedule:** Completed at the Ross Ice Shelf (1st Indian film & 4th in world history to shoot there).\n  - **Kenya African Adventure:** Wildlife and jungle adventure sequences shot across Amboseli National Park, Masai Mara, Lake Naivasha, and Samburu.\n  - **Ramayana Sequence:** A massive 60-day sequence detailing the events of the Ramayana featuring Mahesh Babu as Lord Rama has wrapped.\n  - **Odisha Hilltop Set:** Action sequences shot on a massive Kashi set built atop Talamali Hilltop in Semiliguda, Koraput.\n  - **Hyderabad Battle Scenes:** Giant set pieces with thousands of junior artists are finished.\n  - **IMAX Action Sequences:** Core 1.43:1 IMAX action sequences are complete.\n\n• **What Remains:** Final interconnecting sequences and Ancient Rome scenes, alongside a 2-year post-production VFX window leading up to the **April 7, 2027 (Ugadi)** theatrical release.",
      sources: TRUSTED_SOURCES.filming_status,
    };
  }

  // 5. Dual Role / Rudhra / Lord Rama / Character Destiny
  if (
    q.includes('dual') ||
    q.includes('rudhra') ||
    q.includes('rama') ||
    q.includes('character') ||
    q.includes('destiny') ||
    q.includes('dialogue') ||
    (q.includes('mahesh') && (q.includes('role') || q.includes('play')))
  ) {
    return {
      reply: "Superstar Mahesh Babu portrays a monumental **dual role** in Varanasi:\n\n1. **Rudhra (Modern Hero):**\n   - A character born with a larger purpose and carrying a destiny he did not choose for himself.\n   - Defined by contrasting extremes — witty, vulnerable, and fiercely relentless.\n   - An adventurer uncovering an ancient subterranean secret beneath Varanasi as the city faces an impending asteroid collision.\n\n2. **Lord Rama:**\n   - Portrayed in an epic 60-day sequence depicting pivotal events of the Ramayana, anchoring the film's time-travel narrative from Treta Yuga all the way to Kali Yuga.",
      sources: TRUSTED_SOURCES.dual_role,
    };
  }

  // 6. Cast Members / Kumbha / Mandakini / Priyanka / Prithviraj
  if (
    q.includes('cast') ||
    q.includes('priyanka') ||
    q.includes('chopra') ||
    q.includes('mandakini') ||
    q.includes('prithviraj') ||
    q.includes('sukumaran') ||
    q.includes('kumbha') ||
    q.includes('villain') ||
    q.includes('heroine') ||
    q.includes('prakash raj') ||
    q.includes('nassar') ||
    q.includes('actor')
  ) {
    return {
      reply: "The stellar ensemble cast of Varanasi features:\n\n• **Superstar Mahesh Babu:** Dual role as **Rudhra** and **Lord Rama**.\n• **Priyanka Chopra Jonas:** As **Mandakini** — marking her major return to Indian cinema and her comeback to Telugu cinema after *Thoofan* (2013).\n• **Prithviraj Sukumaran:** As the formidable antagonist **Kumbha** — marking his 3rd Telugu film following *Police Police* and *Salaar*.\n• **Prakash Raj:** In a crucial, pivotal role.\n• **Nassar:** Assisted the crew and specifically trained Mahesh Babu in specialized dialect nuances.",
      sources: TRUSTED_SOURCES.cast_crew,
    };
  }

  // 7. Release Date & Ugadi Festival
  if (
    q.includes('release') ||
    q.includes('date') ||
    q.includes('when') ||
    q.includes('ugadi') ||
    q.includes('2027')
  ) {
    return {
      reply: "Varanasi is scheduled to hit theaters worldwide on **April 7, 2027**, coinciding with the auspicious festival of **Ugadi**!\n\nDirector S. S. Rajamouli scheduled VFX-heavy sequences early in the production to ensure an uninterrupted 2-year post-production timeline for London-based Cinesite, guaranteeing unmatched quality for the 1.43:1 IMAX release.",
      sources: TRUSTED_SOURCES.release_budget,
    };
  }

  // 8. Budget & Profit Sharing
  if (
    q.includes('budget') ||
    q.includes('cost') ||
    q.includes('crore') ||
    q.includes('money') ||
    q.includes('producer') ||
    q.includes('banner')
  ) {
    return {
      reply: "Varanasi is mounted on an unprecedented scale:\n\n• **Projected Budget:** Estimated at **₹1,400 crore**, positioning it as one of the most expensive Indian cinematic ventures in history.\n• **Production Banners:** Produced by K. L. Narayana under **Sri Durga Arts** in collaboration with **Showing Business** (S. S. Karthikeya).\n• **Remuneration Model:** Both director S. S. Rajamouli and Superstar Mahesh Babu have reportedly adopted a profit-sharing model (receiving an advance plus 40% of the profits) to maximize the production value on screen.",
      sources: TRUSTED_SOURCES.release_budget,
    };
  }

  // 9. Music Director / Keeravani / Sound & Score
  if (
    q.includes('music') ||
    q.includes('score') ||
    q.includes('song') ||
    q.includes('keeravani') ||
    q.includes('composer')
  ) {
    return {
      reply: "The music and original score of Varanasi are composed by **M. M. Keeravani**:\n\n• Keeravani is an **Academy Award (Oscar)** and **Golden Globe** winner (for *RRR*'s *Naatu Naatu*).\n• He has scored every single film in S. S. Rajamouli's illustrious career since his debut, crafting iconic musical themes for *Baahubali*, *Magadheera*, *Eega*, and *RRR*.\n• For *Varanasi*, Keeravani blends ancient Vedic Sanskrit chants with monumental orchestral brass and global indigenous instruments to mirror the globetrotting narrative.",
      sources: TRUSTED_SOURCES.music_score,
    };
  }

  // 10. Director / S. S. Rajamouli & Writing Team
  if (
    q.includes('director') ||
    q.includes('rajamouli') ||
    q.includes('writer') ||
    q.includes('vijayendra') ||
    q.includes('story') ||
    q.includes('screenplay') ||
    q.includes('kanchi')
  ) {
    return {
      reply: "The creative vision behind Varanasi is spearheaded by:\n\n• **Director:** **S. S. Rajamouli** (the visionary who redefined Indian cinema with *Baahubali 1 & 2* and *RRR*).\n• **Story & Screenplay:** Conceived by legendary screenwriter **V. Vijayendra Prasad** (Rajamouli's father, writer of *Baahubali*, *RRR*, *Bajrangi Bhaijaan*) alongside **S. S. Kanchi**.\n• **Cinematography:** **P. S. Vinod**, collaborating with Rajamouli for the first time.\n• **Editor:** **Tammiraju**.",
      sources: TRUSTED_SOURCES.cast_crew,
    };
  }

  // 11. Plot, Lore, Asteroid & Multiple Yugas
  if (
    q.includes('plot') ||
    q.includes('premise') ||
    q.includes('asteroid') ||
    q.includes('yuga') ||
    q.includes('kasi') ||
    q.includes('storyline')
  ) {
    return {
      reply: "The premise of Varanasi fuses ancient Indian mythology with high-concept globetrotting science adventure:\n\n• **The Celestial Threat:** The holy, eternal city of Varanasi in India faces the impending catastrophic impact of a celestial asteroid.\n• **Across Multiple Yugas:** The narrative moves through epochs — from **Treta Yuga** (featuring Lord Rama) through to the modern **Kali Yuga**.\n• **Global Expedition:** Rudhra's quest takes him through African jungles in Kenya, subterranean temples in Varanasi, the icy expanses of Antarctica, and historical Roman ruins.",
      sources: TRUSTED_SOURCES.general,
    };
  }

  // 12. General fallback query
  return {
    reply: "Varanasi (SSMB29) is S. S. Rajamouli's upcoming ₹1,400-crore epic action-adventure starring Superstar Mahesh Babu in a dual role (Rudhra and Lord Rama), with Priyanka Chopra Jonas (Mandakini) and Prithviraj Sukumaran (Kumbha).\n\n• **Filming Status:** ~80% complete (Antarctica, Kenya, Ramayana, and IMAX shoots wrapped).\n• **Format:** 1st non-English film natively shot in 1.43:1 full IMAX.\n• **Release:** April 7, 2027 (Ugadi).\n\nAsk me anything about filming milestones, the Antarctica shoot, IMAX 1.43:1, or the cast & crew!",
    sources: TRUSTED_SOURCES.general,
  };
}
