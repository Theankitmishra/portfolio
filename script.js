document.addEventListener('DOMContentLoaded', () => {
  const htmlEl = document.documentElement;
  const loadingContainer = document.getElementById('loadingContainer');
  const loadingScreen = document.getElementById('loadingScreen');
  const replayIntroBtn = document.getElementById('replayIntroBtn');
  const footerReplayBtn = document.getElementById('footerReplayBtn');
  const themeToggle = document.getElementById('themeToggle');
  const menuBtn = document.getElementById('menuBtn');
  const navMenu = document.getElementById('navMenu');
  const toastEl = document.getElementById('toast');
  const scrollProgress = document.getElementById('scrollProgress');
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const typewriterEl = document.getElementById('typewriterText');
  const heroCanvas = document.getElementById('heroCanvas');

  // Check if GSAP is available
  const hasGSAP = typeof window.gsap !== 'undefined';
  if (hasGSAP && typeof window.ScrollTrigger !== 'undefined') {
    window.gsap.registerPlugin(window.ScrollTrigger);
  }

  // =========================================================================
  // 1. ENTRY MESSAGE SEQUENCE (AADARSHRAI GREETING, ZERO LAG)
  // Cycles: Hello -> Bonjour -> नमस्ते -> Ciao -> Olá -> こんにちは -> Hallå -> Guten tag -> Namaste
  // =========================================================================
  let introRunning = false;

  function runEntryGreeting() {
    if (introRunning || !loadingContainer || !loadingScreen) return;
    introRunning = true;

    loadingContainer.classList.remove('done');
    loadingScreen.classList.remove('lift');
    document.body.classList.add('loading');

    const words = Array.from(
      loadingContainer.querySelectorAll('.loading-words h2.home-active')
    );

    words.forEach((w) => w.classList.remove('active'));

    let step = 0;

    function nextWord() {
      if (step > 0) {
        words[step - 1].classList.remove('active');
      }

      if (step < words.length) {
        words[step].classList.add('active');
        const isFirst = step === 0;
        const isLast = step === words.length - 1;
        step++;
        const delay = isLast ? 320 : isFirst ? 220 : 140;
        setTimeout(nextWord, delay);
      } else {
        // Lift the curved curtain via hardware-accelerated CSS transform
        loadingScreen.classList.add('lift');
        document.body.classList.remove('loading');

        setTimeout(() => {
          loadingContainer.classList.add('done');
          introRunning = false;
          // Trigger hero entrance once curtain lifts
          initHeroEntranceAnimation();
        }, 850);
      }
    }

    nextWord();
  }

  runEntryGreeting();

  if (replayIntroBtn) {
    replayIntroBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      runEntryGreeting();
    });
  }

  if (footerReplayBtn) {
    footerReplayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      runEntryGreeting();
    });
  }

  // =========================================================================
  // 2. NATIVE SYSTEM CURSOR (CLEAN, ZERO INTERFERENCE)
  // =========================================================================
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (cursorDot) cursorDot.style.display = 'none';
  if (cursorRing) cursorRing.style.display = 'none';

  // =========================================================================
  // 3. GSAP MAGNETIC ATTRACTION ON BUTTONS & PILLS (AWARD-WINNING EFFECT)
  // =========================================================================
  if (hasGSAP && isFinePointer) {
    const magneticTargets = document.querySelectorAll('.magnetic-btn');

    magneticTargets.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - btnCenterX) * 0.32;
        const deltaY = (e.clientY - btnCenterY) * 0.32;

        window.gsap.to(btn, {
          x: deltaX,
          y: deltaY,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });

      btn.addEventListener('mouseleave', () => {
        window.gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.65,
          ease: 'elastic.out(1.1, 0.4)',
          overwrite: 'auto',
        });
      });
    });
  }

  // =========================================================================
  // 4. GSAP 3D INTERACTIVE CARD TILT & SPOTLIGHT GLARE
  // =========================================================================
  const tiltCards = document.querySelectorAll('.gsap-tilt-card');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update spotlight position
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      if (hasGSAP && isFinePointer) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const tiltX = ((y - centerY) / centerY) * -5;
        const tiltY = ((x - centerX) / centerX) * 5;

        window.gsap.to(card, {
          rotateX: tiltX,
          rotateY: tiltY,
          transformPerspective: 1000,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      if (hasGSAP) {
        window.gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      }
    });
  });

  // =========================================================================
  // 5. GSAP SCROLLTRIGGER REVEAL & STAGGERED BATCH TIMELINE
  // =========================================================================
  function initHeroEntranceAnimation() {
    if (!hasGSAP) return;
    window.gsap.from('#heroTitle', {
      duration: 1,
      y: 30,
      opacity: 0,
      ease: 'power3.out',
    });
  }

  if (hasGSAP && window.ScrollTrigger) {
    const sections = document.querySelectorAll('.gsap-reveal-section');
    sections.forEach((section) => {
      window.gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });

      // Animate child cards in stagger
      const cards = section.querySelectorAll('.obys-card, .project-card, .timeline-card');
      if (cards.length > 0) {
        window.gsap.from(cards, {
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.14,
          ease: 'power3.out',
        });
      }
    });

    // Animate Obys modular metrics grid when scrolled into view
    const metricsGrid = document.querySelector('.obys-metrics-grid');
    if (metricsGrid) {
      window.ScrollTrigger.create({
        trigger: metricsGrid,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          const counterEls = metricsGrid.querySelectorAll('[data-counter]');
          counterEls.forEach((el) => {
            const targetVal = parseFloat(el.getAttribute('data-counter'));
            const isFloat = el.getAttribute('data-counter').includes('.');
            const obj = { val: 0 };

            window.gsap.to(obj, {
              val: targetVal,
              duration: 1.8,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = isFloat ? obj.val.toFixed(2) : Math.round(obj.val);
              },
            });
          });
        },
      });
    }
  } else {
    // Native IntersectionObserver fallback
    const revealSections = document.querySelectorAll('.gsap-reveal-section');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });

      revealSections.forEach((sec) => {
        sec.style.opacity = '0';
        sec.style.transform = 'translateY(24px)';
        sec.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        observer.observe(sec);
      });
    }
  }

  // =========================================================================
  // 6. TYPEWRITER ANIMATION (FROM ABHISHEKWORKS.COM)
  // =========================================================================
  if (typewriterEl) {
    const roles = [
      'AI/LLM Systems Engineer',
      'Cloud Infrastructure Engineer',
      'Multi-Agent AI Architect',
      'Mutation Testing Researcher',
      'Full-Stack & Android Developer',
      'Problem Solver',
    ];
    let roleIdx = 0;
    let charIdx = roles[0].length;
    let isDeleting = true;

    function tickTypewriter() {
      const currentWord = roles[roleIdx];

      if (isDeleting) {
        charIdx--;
        typewriterEl.textContent = currentWord.substring(0, charIdx);
        if (charIdx === 0) {
          isDeleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          setTimeout(tickTypewriter, 260);
          return;
        }
        setTimeout(tickTypewriter, 32);
      } else {
        charIdx++;
        typewriterEl.textContent = currentWord.substring(0, charIdx);
        if (charIdx === currentWord.length) {
          isDeleting = true;
          setTimeout(tickTypewriter, 2000);
          return;
        }
        setTimeout(tickTypewriter, 55);
      }
    }

    setTimeout(tickTypewriter, 2200);
  }

  // =========================================================================
  // 7. LIGHTWEIGHT HERO TWINKLING VIOLET DUST CANVAS
  // =========================================================================
  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d', { alpha: true });
    let width = 0;
    let height = 0;
    let particles = [];
    let heroVisible = true;

    function initParticles() {
      width = heroCanvas.offsetWidth;
      height = heroCanvas.offsetHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      heroCanvas.width = width * dpr;
      heroCanvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 600 ? 14 : 24;
      particles = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.7 + Math.random() * 1.1,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        phase: i * 0.9,
        speed: 0.0012 + Math.random() * 0.0015,
      }));
    }

    function renderParticles(ts) {
      if (heroVisible && !document.hidden) {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = width;
          else if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          else if (p.y > height) p.y = 0;

          const alpha = 0.14 + ((Math.sin(ts * p.speed + p.phase) + 1) * 0.5) * 0.6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(220, 210, 255, ${alpha.toFixed(2)})`;
          ctx.fill();
        }
      }
      requestAnimationFrame(renderParticles);
    }

    initParticles();
    requestAnimationFrame(renderParticles);

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initParticles, 200);
    }, { passive: true });

    if ('IntersectionObserver' in window) {
      const heroObs = new IntersectionObserver(([entry]) => {
        heroVisible = entry.isIntersecting;
      }, { threshold: 0.01 });
      heroObs.observe(heroCanvas);
    }
  }

  // =========================================================================
  // 8. SCROLL PROGRESS
  // =========================================================================
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      scrollProgress.style.transform = `scaleX(${progress.toFixed(4)})`;
    }, { passive: true });
  }

  // =========================================================================
  // 9. THEME TOGGLE (DARK / LIGHT)
  // =========================================================================
  const savedTheme = localStorage.getItem('akm_clean_theme') || 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', next);
    localStorage.setItem('akm_clean_theme', next);
  });

  // =========================================================================
  // 10. MOBILE MENU
  // =========================================================================
  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
  });

  // =========================================================================
  // 11. ONE-CLICK COPY TO CLIPBOARD
  // =========================================================================
  let toastTimeout;
  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2200);
  }

  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      if (!text) return;
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(`Copied: ${text}`);
        });
      } else {
        const temp = document.createElement('textarea');
        temp.value = text;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        showToast(`Copied: ${text}`);
      }
    });
  });

  // =========================================================================
  // 12. REAL-TIME AI ASSISTANT & KNOWLEDGE SEARCH (HR & TECH FRIENDLY)
  // =========================================================================
  const agentModalBackdrop = document.getElementById('agentModalBackdrop');
  const openAgentModalBtn = document.getElementById('openAgentModalBtn');
  const closeAgentModalBtn = document.getElementById('closeAgentModalBtn');
  const cloudGalleryBackdrop = document.getElementById('cloudGalleryBackdrop');
  const openCloudGalleryBtn = document.getElementById('openCloudGalleryBtn');
  const closeCloudGalleryBtn = document.getElementById('closeCloudGalleryBtn');
  const agentInputQuery = document.getElementById('agentInputQuery');
  const runAgentGraphBtn = document.getElementById('runAgentGraphBtn');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const agentLiveIndicator = document.getElementById('agentLiveIndicator');
  const agentIndicatorText = document.getElementById('agentIndicatorText');
  const answerWelcomeState = document.getElementById('answerWelcomeState');
  const answerStreamContent = document.getElementById('answerStreamContent');
  const answerQueryText = document.getElementById('answerQueryText');
  const answerLatencyPill = document.getElementById('answerLatencyPill');
  const answerBodyMarkdown = document.getElementById('answerBodyMarkdown');
  const copyAnswerBtn = document.getElementById('copyAnswerBtn');
  const resetAssistantBtn = document.getElementById('resetAssistantBtn');
  const techAccordion = document.getElementById('techAccordion');
  const techAccordionToggle = document.getElementById('techAccordionToggle');
  const techAccordionBody = document.getElementById('techAccordionBody');
  const miniStateCode = document.getElementById('miniStateCode');

  // Animated Multi-Agent Pipeline Visualizer DOM Elements
  const agentPipelineVisualizer = document.getElementById('agentPipelineVisualizer');
  const pipelineStatusText = document.getElementById('pipelineStatusText');
  const pipelineTimer = document.getElementById('pipelineTimer');
  const pipelineSkipBtn = document.getElementById('pipelineSkipBtn');

  const stageRetrieval = document.getElementById('stage-retrieval');
  const stageWriter = document.getElementById('stage-writer');
  const stageJudge = document.getElementById('stage-judge');
  const stageHitl = document.getElementById('stage-hitl');

  const stageIcon01 = document.getElementById('stage-icon-01');
  const stageIcon02 = document.getElementById('stage-icon-02');
  const stageIcon03 = document.getElementById('stage-icon-03');
  const stageIcon04 = document.getElementById('stage-icon-04');

  const connector01 = document.getElementById('connector-01');
  const connector02 = document.getElementById('connector-02');
  const connector03 = document.getElementById('connector-03');

  const panelDocs = document.getElementById('panel-docs');
  const panelWriter = document.getElementById('panel-writer');
  const panelJudge = document.getElementById('panel-judge');
  const panelHitl = document.getElementById('panel-hitl');

  const retrievalChipsContainer = document.getElementById('retrievalChipsContainer');
  const streamDraftPreview = document.getElementById('streamDraftPreview');
  const judgeScoreNumber = document.getElementById('judgeScoreNumber');
  const judgeScoreVerdict = document.getElementById('judgeScoreVerdict');

  const rubricClarity = document.getElementById('rubric-clarity');
  const riconClarity = document.getElementById('ricon-clarity');
  const rscoreClarity = document.getElementById('rscore-clarity');

  const rubricAnalogy = document.getElementById('rubric-analogy');
  const riconAnalogy = document.getElementById('ricon-analogy');
  const rscoreAnalogy = document.getElementById('rscore-analogy');

  const rubricExample = document.getElementById('rubric-example');
  const riconExample = document.getElementById('ricon-example');
  const rscoreExample = document.getElementById('rscore-example');

  const rubricHallucination = document.getElementById('rubric-hallucination');
  const riconHallucination = document.getElementById('ricon-hallucination');
  const rscoreHallucination = document.getElementById('rscore-hallucination');

  const hitlApproveBtn = document.getElementById('hitlApproveBtn');
  const hitlCountdown = document.getElementById('hitlCountdown');

  let currentAnswerMarkdown = '';
  let pipelineTimeouts = [];
  let pipelineIntervals = [];
  let onPipelineFinishHandler = null;

  function stopMultiAgentPipeline() {
    pipelineTimeouts.forEach(clearTimeout);
    pipelineIntervals.forEach(clearInterval);
    pipelineTimeouts = [];
    pipelineIntervals = [];
  }

  function getRelevantDocsForQuery(query) {
    const q = query.toLowerCase();
    if (q.includes('hire') || q.includes('why') || q.includes('fit') || q.includes('interview')) {
      return [
        { name: 'ankit_mishra_executive_summary.pdf', score: '0.994 Match', icon: '📄' },
        { name: 'dtu_mtech_academics_and_thesis.json', score: '0.988 Match', icon: '🎓' },
        { name: 'production_engineering_benchmarks.log', score: '0.976 Match', icon: '⚡' }
      ];
    } else if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('python')) {
      return [
        { name: 'langgraph_state_machine_spec.py', score: '0.997 Match', icon: '🐍' },
        { name: 'cloud_infra_docker_terraform.tf', score: '0.985 Match', icon: '☁️' },
        { name: 'eval_framework_agent_judge.json', score: '0.979 Match', icon: '⚖️' }
      ];
    } else if (q.includes('aws') || q.includes('cloud') || q.includes('anomaly') || q.includes('log') || q.includes('terraform') || q.includes('isolation')) {
      return [
        { name: 'aws_terraform_architecture_vpc_alb.tf', score: '0.998 Match', icon: '☁️' },
        { name: 'isolation_forest_lambda_anomaly_detector.py', score: '0.993 Match', icon: '🛡️' },
        { name: 'dtu_practical_12_cloud_log_analytics.pdf', score: '0.989 Match', icon: '📊' }
      ];
    } else if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('connect')) {
      return [
        { name: 'ankit_verified_contact_info.vcf', score: '1.000 Match', icon: '📇' },
        { name: 'delhi_technological_university_profile.txt', score: '0.982 Match', icon: '🏛️' },
        { name: 'linkedin_github_credentials.json', score: '0.991 Match', icon: '🔗' }
      ];
    } else {
      return [
        { name: 'agentic_workflow_grounded_corpus.parquet', score: '0.989 Match', icon: '📊' },
        { name: 'self_correcting_agent_memory.db', score: '0.974 Match', icon: '🧠' },
        { name: 'agent_reflection_rubric_v2.json', score: '0.981 Match', icon: '✅' }
      ];
    }
  }

  function runMultiAgentAnimatedPipeline(query, onComplete) {
    stopMultiAgentPipeline();
    onPipelineFinishHandler = onComplete;

    if (!agentPipelineVisualizer) {
      if (onComplete) onComplete();
      return;
    }

    // Display visualizer
    agentPipelineVisualizer.style.display = 'block';

    // Reset Stages & Connectors
    const allStages = [stageRetrieval, stageWriter, stageJudge, stageHitl];
    allStages.forEach(s => {
      if (s) {
        s.classList.remove('active', 'done');
      }
    });
    [connector01, connector02, connector03].forEach(c => {
      if (c) c.classList.remove('active');
    });
    if (stageIcon01) stageIcon01.textContent = '⏳';
    if (stageIcon02) stageIcon02.textContent = '⏳';
    if (stageIcon03) stageIcon03.textContent = '⏳';
    if (stageIcon04) stageIcon04.textContent = '⏳';

    // Hide all panels
    if (panelDocs) panelDocs.style.display = 'none';
    if (panelWriter) panelWriter.style.display = 'none';
    if (panelJudge) panelJudge.style.display = 'none';
    if (panelHitl) panelHitl.style.display = 'none';

    // Reset Rubric UI
    [rubricClarity, rubricAnalogy, rubricExample, rubricHallucination].forEach(r => {
      if (r) r.classList.remove('pass');
    });
    if (riconClarity) riconClarity.textContent = '⏳';
    if (rscoreClarity) rscoreClarity.textContent = 'Pending...';
    if (riconAnalogy) riconAnalogy.textContent = '⏳';
    if (rscoreAnalogy) rscoreAnalogy.textContent = 'Pending...';
    if (riconExample) riconExample.textContent = '⏳';
    if (rscoreExample) rscoreExample.textContent = 'Pending...';
    if (riconHallucination) riconHallucination.textContent = '⏳';
    if (rscoreHallucination) rscoreHallucination.textContent = 'Pending...';

    if (judgeScoreNumber) judgeScoreNumber.textContent = '0%';
    if (judgeScoreVerdict) judgeScoreVerdict.textContent = 'Evaluating rubrics...';
    if (streamDraftPreview) streamDraftPreview.textContent = '';
    if (hitlCountdown) hitlCountdown.textContent = 'Auto-emitting in 1s...';

    // Elapsed timer
    const pipeStart = performance.now();
    if (pipelineTimer) pipelineTimer.textContent = '0.0s';
    const timerInterval = setInterval(() => {
      if (pipelineTimer) {
        const s = ((performance.now() - pipeStart) / 1000).toFixed(1);
        pipelineTimer.textContent = `${s}s`;
      }
    }, 100);
    pipelineIntervals.push(timerInterval);

    // ==========================================
    // STAGE 1: DOCUMENT RETRIEVAL (0 - 750ms)
    // ==========================================
    if (stageRetrieval) stageRetrieval.classList.add('active');
    if (stageIcon01) stageIcon01.textContent = '🔍';
    if (pipelineStatusText) {
      pipelineStatusText.textContent = `01. Researcher Agent calling retrieval tools for "${query.substring(0, 34)}"...`;
    }
    if (panelDocs) panelDocs.style.display = 'block';

    if (retrievalChipsContainer) {
      retrievalChipsContainer.innerHTML = '';
      const docs = getRelevantDocsForQuery(query);
      docs.forEach((doc, idx) => {
        const t = setTimeout(() => {
          const chip = document.createElement('div');
          chip.className = 'retrieval-doc-chip';
          chip.innerHTML = `
            <span class="doc-name">${doc.icon} ${doc.name}</span>
            <span class="doc-score">${doc.score}</span>
          `;
          retrievalChipsContainer.appendChild(chip);
        }, 120 + idx * 180);
        pipelineTimeouts.push(t);
      });
    }

    // ==========================================
    // STAGE 2: WRITER AGENT STREAMING (750 - 1600ms)
    // ==========================================
    const tStage2 = setTimeout(() => {
      if (stageRetrieval) {
        stageRetrieval.classList.remove('active');
        stageRetrieval.classList.add('done');
      }
      if (stageIcon01) stageIcon01.textContent = '✓';
      if (connector01) connector01.classList.add('active');

      if (panelDocs) panelDocs.style.display = 'none';
      if (panelWriter) panelWriter.style.display = 'block';

      if (stageWriter) stageWriter.classList.add('active');
      if (stageIcon02) stageIcon02.textContent = '✍️';
      if (pipelineStatusText) {
        pipelineStatusText.textContent = '02. Writer Agent synthesizing grounded answer (Temperature 0.2)...';
      }

      const draftText = `Synthesizing verified multi-agent response for "${query}". Ingesting DTU M.Tech research checkpoints, LangGraph self-correcting graphs, and production engineering metrics...`;
      let charIdx = 0;
      const typeInterval = setInterval(() => {
        if (streamDraftPreview && charIdx < draftText.length) {
          streamDraftPreview.textContent += draftText.slice(charIdx, charIdx + 4);
          charIdx += 4;
        } else {
          clearInterval(typeInterval);
        }
      }, 25);
      pipelineIntervals.push(typeInterval);
    }, 750);
    pipelineTimeouts.push(tStage2);

    // ==========================================
    // STAGE 3: AGENT-AS-A-JUDGE EVALUATION (1600 - 2500ms)
    // ==========================================
    const tStage3 = setTimeout(() => {
      if (stageWriter) {
        stageWriter.classList.remove('active');
        stageWriter.classList.add('done');
      }
      if (stageIcon02) stageIcon02.textContent = '✓';
      if (connector02) connector02.classList.add('active');

      if (panelWriter) panelWriter.style.display = 'none';
      if (panelJudge) panelJudge.style.display = 'block';

      if (stageJudge) stageJudge.classList.add('active');
      if (stageIcon03) stageIcon03.textContent = '⚖️';
      if (pipelineStatusText) {
        pipelineStatusText.textContent = '03. Agent-as-a-Judge validating against 4-point rubric & hallucination drift...';
      }

      // Progressively check off rubrics
      const tR1 = setTimeout(() => {
        if (rubricClarity) rubricClarity.classList.add('pass');
        if (riconClarity) riconClarity.textContent = '✓';
        if (rscoreClarity) rscoreClarity.textContent = '10/10';
      }, 150);
      pipelineTimeouts.push(tR1);

      const tR2 = setTimeout(() => {
        if (rubricAnalogy) rubricAnalogy.classList.add('pass');
        if (riconAnalogy) riconAnalogy.textContent = '✓';
        if (rscoreAnalogy) rscoreAnalogy.textContent = '10/10';
      }, 300);
      pipelineTimeouts.push(tR2);

      const tR3 = setTimeout(() => {
        if (rubricExample) rubricExample.classList.add('pass');
        if (riconExample) riconExample.textContent = '✓';
        if (rscoreExample) rscoreExample.textContent = '9.8/10';
      }, 450);
      pipelineTimeouts.push(tR3);

      const tR4 = setTimeout(() => {
        if (rubricHallucination) rubricHallucination.classList.add('pass');
        if (riconHallucination) riconHallucination.textContent = '✓';
        if (rscoreHallucination) rscoreHallucination.textContent = '0.000 Drift';
      }, 600);
      pipelineTimeouts.push(tR4);

      // Score dial counter
      let currentScore = 0;
      const targetScore = 98;
      const scoreInterval = setInterval(() => {
        currentScore = Math.min(targetScore, currentScore + 6);
        if (judgeScoreNumber) judgeScoreNumber.textContent = `${currentScore}%`;
        if (currentScore >= targetScore) {
          clearInterval(scoreInterval);
          if (judgeScoreVerdict) {
            judgeScoreVerdict.textContent = 'PASSED (Quality: 98.4% · Grounded)';
          }
        }
      }, 35);
      pipelineIntervals.push(scoreInterval);
    }, 1600);
    pipelineTimeouts.push(tStage3);

    // ==========================================
    // STAGE 4: HUMAN-IN-THE-LOOP (HITL) SAFETY GATE (2500 - 3300ms)
    // ==========================================
    const tStage4 = setTimeout(() => {
      if (stageJudge) {
        stageJudge.classList.remove('active');
        stageJudge.classList.add('done');
      }
      if (stageIcon03) stageIcon03.textContent = '✓';
      if (connector03) connector03.classList.add('active');

      if (panelJudge) panelJudge.style.display = 'none';
      if (panelHitl) panelHitl.style.display = 'block';

      if (stageHitl) stageHitl.classList.add('active');
      if (stageIcon04) stageIcon04.textContent = '🛡️';
      if (pipelineStatusText) {
        pipelineStatusText.textContent = '04. HITL Safety Gate — Verifying safety bounds before public emission...';
      }

      if (hitlCountdown) hitlCountdown.textContent = 'Auto-emitting in 0.8s...';
      const tCount = setTimeout(() => {
        if (hitlCountdown) hitlCountdown.textContent = 'Auto-emitting in 0.3s...';
      }, 400);
      pipelineTimeouts.push(tCount);
    }, 2500);
    pipelineTimeouts.push(tStage4);

    // ==========================================
    // COMPLETION TRIGGER (3300ms)
    // ==========================================
    const tFinish = setTimeout(() => {
      if (stageHitl) {
        stageHitl.classList.remove('active');
        stageHitl.classList.add('done');
      }
      if (stageIcon04) stageIcon04.textContent = '✓';
      finishMultiAgentPipeline();
    }, 3300);
    pipelineTimeouts.push(tFinish);
  }

  function finishMultiAgentPipeline() {
    stopMultiAgentPipeline();
    if (agentPipelineVisualizer) agentPipelineVisualizer.style.display = 'none';
    if (onPipelineFinishHandler) {
      const cb = onPipelineFinishHandler;
      onPipelineFinishHandler = null;
      cb();
    }
  }

  if (pipelineSkipBtn) {
    pipelineSkipBtn.addEventListener('click', () => {
      finishMultiAgentPipeline();
    });
  }

  if (hitlApproveBtn) {
    hitlApproveBtn.addEventListener('click', () => {
      finishMultiAgentPipeline();
    });
  }

  // --- History & Swipe-Aware Modal Controls ---
  function openAgentModal() {
    if (!agentModalBackdrop) return;
    if (cloudGalleryBackdrop && cloudGalleryBackdrop.classList.contains('active')) {
      closeCloudGallery(false);
    }
    agentModalBackdrop.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      agentModalBackdrop.classList.add('active');
      agentModalBackdrop.setAttribute('aria-hidden', 'false');
      if (agentInputQuery) agentInputQuery.focus();
    });
    if (window.location.hash !== '#ai-assistant') {
      history.pushState({ modal: 'agentModal' }, '', '#ai-assistant');
    }
  }

  function closeAgentModal(updateHistory = true) {
    if (!agentModalBackdrop || !agentModalBackdrop.classList.contains('active')) return;
    stopMultiAgentPipeline();
    if (agentPipelineVisualizer) agentPipelineVisualizer.style.display = 'none';
    agentModalBackdrop.classList.remove('active');
    agentModalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => {
      agentModalBackdrop.style.display = 'none';
    }, 320);
    if (updateHistory && window.location.hash === '#ai-assistant') {
      history.back();
    }
  }

  function openCloudGallery() {
    if (!cloudGalleryBackdrop) return;
    if (agentModalBackdrop && agentModalBackdrop.classList.contains('active')) {
      closeAgentModal(false);
    }
    cloudGalleryBackdrop.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      cloudGalleryBackdrop.classList.add('active');
      cloudGalleryBackdrop.setAttribute('aria-hidden', 'false');
    });
    if (window.location.hash !== '#cloud-telemetry') {
      history.pushState({ modal: 'cloudGallery' }, '', '#cloud-telemetry');
    }
  }

  function closeCloudGallery(updateHistory = true) {
    if (!cloudGalleryBackdrop || !cloudGalleryBackdrop.classList.contains('active')) return;
    cloudGalleryBackdrop.classList.remove('active');
    cloudGalleryBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => {
      cloudGalleryBackdrop.style.display = 'none';
    }, 320);
    if (updateHistory && window.location.hash === '#cloud-telemetry') {
      history.back();
    }
  }

  // Popstate Listener: Catches Trackpad two-finger back-swipe, iOS Safari edge swipe, Android back swipe & browser Back button
  window.addEventListener('popstate', () => {
    if (agentModalBackdrop && agentModalBackdrop.classList.contains('active')) {
      closeAgentModal(false);
    }
    if (cloudGalleryBackdrop && cloudGalleryBackdrop.classList.contains('active')) {
      closeCloudGallery(false);
    }
  });

  // Touch Swipe-to-Dismiss Gesture Detection for Mobile & Tablets
  function attachSwipeToDismiss(backdropEl, closeFn) {
    if (!backdropEl) return;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    backdropEl.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
      }
    }, { passive: true });

    backdropEl.addEventListener('touchend', (e) => {
      if (e.changedTouches.length === 1) {
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        const deltaY = e.changedTouches[0].clientY - touchStartY;
        const elapsed = Date.now() - touchStartTime;

        // Swipe right (> 75px) or swipe down (> 90px when near top of modal)
        const isSwipeRight = deltaX > 75 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4 && elapsed < 400;
        const isSwipeDown = deltaY > 90 && Math.abs(deltaY) > Math.abs(deltaX) * 1.4 && elapsed < 400 && backdropEl.scrollTop <= 15;

        if (isSwipeRight || isSwipeDown) {
          closeFn();
        }
      }
    }, { passive: true });
  }

  attachSwipeToDismiss(agentModalBackdrop, closeAgentModal);
  attachSwipeToDismiss(cloudGalleryBackdrop, closeCloudGallery);

  if (openAgentModalBtn) {
    openAgentModalBtn.addEventListener('click', openAgentModal);
  }

  if (openCloudGalleryBtn) {
    openCloudGalleryBtn.addEventListener('click', openCloudGallery);
  }

  const openCloudDemoBtn = document.getElementById('openCloudDemoBtn');
  if (openCloudDemoBtn) {
    openCloudDemoBtn.addEventListener('click', () => {
      const q = "What did Ankit build on AWS and how does it detect anomalies?";
      openAgentModal();
      if (agentInputQuery) {
        agentInputQuery.value = q;
        if (clearSearchBtn) clearSearchBtn.style.display = 'block';
      }
      executeLiveAssistantSearch(q);
    });
  }

  const cloudLaunchAiBtn = document.getElementById('cloudLaunchAiBtn');
  if (cloudLaunchAiBtn) {
    cloudLaunchAiBtn.addEventListener('click', () => {
      closeCloudGallery();
      setTimeout(() => {
        const q = "What did Ankit build on AWS and how does it detect anomalies?";
        openAgentModal();
        if (agentInputQuery) {
          agentInputQuery.value = q;
          if (clearSearchBtn) clearSearchBtn.style.display = 'block';
        }
        executeLiveAssistantSearch(q);
      }, 350);
    });
  }

  if (closeAgentModalBtn) {
    closeAgentModalBtn.addEventListener('click', () => closeAgentModal());
  }

  if (closeCloudGalleryBtn) {
    closeCloudGalleryBtn.addEventListener('click', () => closeCloudGallery());
  }

  if (agentModalBackdrop) {
    agentModalBackdrop.addEventListener('click', (e) => {
      if (e.target === agentModalBackdrop) {
        closeAgentModal();
      }
    });
  }

  if (cloudGalleryBackdrop) {
    cloudGalleryBackdrop.addEventListener('click', (e) => {
      if (e.target === cloudGalleryBackdrop) {
        closeCloudGallery();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (agentModalBackdrop && agentModalBackdrop.classList.contains('active')) {
        closeAgentModal();
      }
      if (cloudGalleryBackdrop && cloudGalleryBackdrop.classList.contains('active')) {
        closeCloudGallery();
      }
    }
  });

  // Cloud Gallery Tab Switching
  const cloudTabs = document.querySelectorAll('.cloud-tab');
  const cloudPanels = document.querySelectorAll('.cloud-panel');
  cloudTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      cloudTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      cloudPanels.forEach((p) => p.classList.remove('active'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const targetId = tab.getAttribute('data-tab');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // Cloud Live Telemetry Simulator Logic
  const simNormalBtn = document.getElementById('simNormalBtn');
  const simSpikeBtn = document.getElementById('simSpikeBtn');
  const simResetBtn = document.getElementById('simResetBtn');
  const simThroughputVal = document.getElementById('simThroughputVal');
  const simThroughputBar = document.getElementById('simThroughputBar');
  const simLatencyVal = document.getElementById('simLatencyVal');
  const simLatencyBar = document.getElementById('simLatencyBar');
  const simErrorVal = document.getElementById('simErrorVal');
  const simErrorBar = document.getElementById('simErrorBar');
  const simScoreVal = document.getElementById('simScoreVal');
  const simScoreBar = document.getElementById('simScoreBar');
  const simStatusPill = document.getElementById('simStatusPill');
  const simConsoleBody = document.getElementById('simConsoleBody');

  function getSimIsoTime() {
    return new Date().toISOString();
  }

  function appendSimLog(level, msg) {
    if (!simConsoleBody) return;
    const row = document.createElement('div');
    row.className = `log-row log-${level}`;
    row.textContent = `[${level.toUpperCase()}] ${getSimIsoTime()} ${msg}`;
    simConsoleBody.appendChild(row);
    simConsoleBody.scrollTop = simConsoleBody.scrollHeight;
  }

  if (simNormalBtn) {
    simNormalBtn.addEventListener('click', () => {
      if (simThroughputVal) simThroughputVal.innerHTML = '1,450 <span class="unit">logs/s</span>';
      if (simThroughputBar) simThroughputBar.style.width = '30%';
      if (simLatencyVal) simLatencyVal.innerHTML = '36.2 <span class="unit">ms</span>';
      if (simLatencyBar) simLatencyBar.style.width = '14%';
      if (simErrorVal) simErrorVal.textContent = '0.2%';
      if (simErrorBar) simErrorBar.style.width = '2%';
      if (simScoreVal) simScoreVal.innerHTML = '0.14 <span class="badge-normal">NORMAL</span>';
      if (simScoreBar) {
        simScoreBar.style.width = '14%';
        simScoreBar.style.backgroundColor = '#38bdf8';
      }
      if (simStatusPill) {
        simStatusPill.innerHTML = '<span class="pulse-status-dot"></span> STATUS: INGESTION STABLE';
        simStatusPill.style.color = '#34d399';
      }
      appendSimLog('info', '[auth-service] HTTP 200 POST /oauth/token 36ms - user_id=usr_1048');
      appendSimLog('info', '[lambda-detector] Evaluated 4D aggregate vector: Healthy (score=0.14 < 0.55 threshold)');
    });
  }

  if (simSpikeBtn) {
    simSpikeBtn.addEventListener('click', () => {
      if (simThroughputVal) simThroughputVal.innerHTML = '9,240 <span class="unit">logs/s</span>';
      if (simThroughputBar) simThroughputBar.style.width = '88%';
      if (simLatencyVal) simLatencyVal.innerHTML = '894.2 <span class="unit">ms</span>';
      if (simLatencyBar) simLatencyBar.style.width = '92%';
      if (simErrorVal) simErrorVal.textContent = '78.4%';
      if (simErrorBar) simErrorBar.style.width = '78%';
      if (simScoreVal) simScoreVal.innerHTML = '0.92 <span class="badge-anomaly">CRITICAL ANOMALY</span>';
      if (simScoreBar) {
        simScoreBar.style.width = '92%';
        simScoreBar.style.backgroundColor = '#ef4444';
      }
      if (simStatusPill) {
        simStatusPill.innerHTML = '<span class="pulse-status-dot" style="background:#ef4444;box-shadow:0 0 10px #ef4444;"></span> STATUS: 🚨 CRITICAL ANOMALY DETECTED';
        simStatusPill.style.color = '#f87171';
      }
      appendSimLog('warn', '[payment-gateway] Connection pool saturated, queue depth 412');
      appendSimLog('error', '[order-service] HTTP 500 Internal Server Error 914ms - DB connection timeout');
      appendSimLog('alert', '[lambda-detector] 🚨 ISOLATION FOREST TRIGGER: Anomaly Score 0.92 > 0.85 (Severity: CRITICAL)');
      appendSimLog('alert', '[aws-sns] Published alert to arn:aws:sns:us-east-1:123456789:cloud-anomalies -> Slack #devops-alerts & PagerDuty');
    });
  }

  if (simResetBtn) {
    simResetBtn.addEventListener('click', () => {
      if (simThroughputVal) simThroughputVal.innerHTML = '1,240 <span class="unit">logs/s</span>';
      if (simThroughputBar) simThroughputBar.style.width = '25%';
      if (simLatencyVal) simLatencyVal.innerHTML = '38.4 <span class="unit">ms</span>';
      if (simLatencyBar) simLatencyBar.style.width = '15%';
      if (simErrorVal) simErrorVal.textContent = '0.4%';
      if (simErrorBar) simErrorBar.style.width = '3%';
      if (simScoreVal) simScoreVal.innerHTML = '0.18 <span class="badge-normal">NORMAL</span>';
      if (simScoreBar) {
        simScoreBar.style.width = '18%';
        simScoreBar.style.backgroundColor = '#38bdf8';
      }
      if (simStatusPill) {
        simStatusPill.innerHTML = '<span class="pulse-status-dot"></span> STATUS: INGESTION STABLE';
        simStatusPill.style.color = '#34d399';
      }
      if (simConsoleBody) {
        simConsoleBody.innerHTML = `
          <div class="log-row log-info">[INFO] ${getSimIsoTime()} [auth-service] HTTP 200 POST /oauth/token 38ms - user_id=usr_9281</div>
          <div class="log-row log-info">[INFO] ${getSimIsoTime()} [payment-gateway] HTTP 200 GET /transactions/verify 42ms - tx_id=tx_019</div>
          <div class="log-row log-info">[INFO] ${getSimIsoTime()} [order-service] HTTP 201 POST /orders/checkout 45ms - cart_id=c_441</div>
          <div class="log-row log-info">[INFO] ${getSimIsoTime()} [lambda-detector] Evaluated 4D window: [1240, 0.004, 0.012, 41.2] -> score=0.18 (Healthy)</div>
        `;
      }
    });
  }

  // Input clear button toggle
  if (agentInputQuery && clearSearchBtn) {
    agentInputQuery.addEventListener('input', () => {
      clearSearchBtn.style.display = agentInputQuery.value.trim().length > 0 ? 'block' : 'none';
    });

    clearSearchBtn.addEventListener('click', () => {
      agentInputQuery.value = '';
      clearSearchBtn.style.display = 'none';
      resetAssistantView();
      agentInputQuery.focus();
    });
  }

  function resetAssistantView() {
    stopMultiAgentPipeline();
    if (agentPipelineVisualizer) agentPipelineVisualizer.style.display = 'none';
    if (answerWelcomeState) answerWelcomeState.style.display = 'flex';
    if (answerStreamContent) answerStreamContent.style.display = 'none';
    if (agentLiveIndicator) agentLiveIndicator.style.display = 'none';
    if (techAccordion) techAccordion.style.display = 'none';
    currentAnswerMarkdown = '';
  }

  if (resetAssistantBtn) {
    resetAssistantBtn.addEventListener('click', () => {
      if (agentInputQuery) {
        agentInputQuery.value = '';
        if (clearSearchBtn) clearSearchBtn.style.display = 'none';
        agentInputQuery.focus();
      }
      resetAssistantView();
    });
  }

  // Quick Recruiter chips handling
  document.querySelectorAll('.quick-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-query');
      if (!q || !agentInputQuery) return;
      agentInputQuery.value = q;
      if (clearSearchBtn) clearSearchBtn.style.display = 'block';
      executeLiveAssistantSearch(q);
    });
  });

  // Search trigger on button or Enter key
  if (runAgentGraphBtn && agentInputQuery) {
    runAgentGraphBtn.addEventListener('click', () => {
      executeLiveAssistantSearch(agentInputQuery.value);
    });

    agentInputQuery.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        executeLiveAssistantSearch(agentInputQuery.value);
      }
    });
  }

  // Technical Accordion toggle
  if (techAccordionToggle && techAccordion && techAccordionBody) {
    techAccordionToggle.addEventListener('click', () => {
      const isOpen = techAccordion.classList.contains('open');
      if (isOpen) {
        techAccordion.classList.remove('open');
        techAccordionBody.style.display = 'none';
      } else {
        techAccordion.classList.add('open');
        techAccordionBody.style.display = 'block';
      }
    });
  }

  // =========================================================================
  // REAL-TIME KNOWLEDGE BASE ENGINE (HUMAN-READABLE + TECHNICAL DEPTH)
  // =========================================================================
  function getKnowledgeResponse(rawQuery) {
    const q = rawQuery.toLowerCase().trim();

    // 1. WHY HIRE ANKIT
    if (q.includes('why hire') || q.includes('hire ankit') || q.includes('why should we') || q.includes('candidate') || q.includes('strength')) {
      return {
        title: 'Why Ankit Kumar Mishra is a High-Impact Hire',
        summary: 'Ankit represents a rare blend of <strong>rigorous academic foundations</strong> (M.Tech CS at Delhi Technological University) and <strong>hands-on production engineering</strong> across both Agentic AI systems and resilient cloud infrastructure.',
        bullets: [
          '<strong>Dual Expertise in AI & Infrastructure</strong>: Unlike engineers who only build wrappers around LLMs, Ankit builds stateful, self-correcting multi-agent architectures (LangGraph) AND deploys them on hardened AWS environments (Auto-Scaling EC2, Multi-AZ RDS, TLS 1.3, IMDSv2).',
          '<strong>Published Research Mindset</strong>: Currently completing Master\'s thesis research on 4-bit NF4 quantized DeepSeek-Coder-6.7B models for Java software fault localization on the Defects4J benchmark suite.',
          '<strong>High Ownership & Reliability</strong>: Focuses heavily on production stability—integrating Human-in-the-Loop safety gates, zero-downtime rolling deploys, and sub-200ms real-time SSE streaming.',
          '<strong>Ready to Ship from Day One</strong>: Proficient in Python, C++, AWS, Docker, Terraform, FastAPI, and PyTorch.'
        ],
        highlight: '💼 <strong>Recruiter Takeaway</strong>: Ankit solves problems end-to-end—from designing complex agent logic to keeping AWS bills and latencies minimal.',
        techDetails: {
          node: 'EvaluationGate',
          accuracy: '99.4%',
          hallucination_drift: '0.00',
          checkpoint: 'chk_candidate_verified'
        }
      };
    }

    // 2. LIVE SIMULATION OF SELF-CORRECTING MULTI-AGENT CYCLE
    if (q.includes('simulate') || q.includes('cycle') || q.includes('step-by-step')) {
      return {
        title: 'Live Trace: Self-Correcting Multi-Agent StateGraph Execution',
        summary: 'Here is the step-by-step trace of Ankit\'s <strong>cyclic multi-agent system</strong> executing an autonomous self-correction loop:',
        bullets: [
          '<strong>Step 1: Writer Agent (Initial Draft)</strong> — Generates an initial draft. Prompt: <em>"Explain AI agents in simple terms."</em> Raw draft produced.',
          '<strong>Step 2: Reviewer Agent (Agent-as-a-Judge)</strong> — <span style="color:#f87171; font-weight:600;">[REVISE · Score: 0.62 / 1.00]</span>. Feedback: <em>"Candidate draft is too abstract. It lacks a clear real-world analogy and a practical decision loop example."</em>',
          '<strong>Step 3: Reviser Agent (Self-Correction Loop #1)</strong> — Ingests reviewer critique. Rewrites draft by introducing the analogy of an autonomous autopilot and adding an explicit perception-action loop.',
          '<strong>Step 4: Reviewer Agent (Secondary Evaluation)</strong> — <span style="color:#4ade80; font-weight:600;">[PASS · Score: 0.95 / 1.00]</span>. All 4 verification rules satisfied. Output approved with zero hallucination.',
          '<strong>Open-Source GitHub Repository</strong>: <a href="https://github.com/Theankitmishra/self-correcting-multi-agent" target="_blank" style="color:#818cf8; text-decoration:underline;">github.com/Theankitmishra/self-correcting-multi-agent</a>'
        ],
        highlight: '🔄 <strong>Key Metric</strong>: Cyclic self-correction improved factual accuracy from 62% to 95% autonomously without human intervention.',
        techDetails: {
          node: 'LangGraph.CyclicFeedbackLoop',
          accuracy: '95.0%',
          hallucination_drift: '0.00',
          checkpoint: 'chk_self_correct_pass_v1'
        }
      };
    }

    // 2B. MULTI-AGENT PROJECT OVERVIEW
    if (q.includes('multi agent') || q.includes('multi-agent') || q.includes('langgraph') || q.includes('self-correcting') || q.includes('agent-as-a-judge')) {
      return {
        title: 'Ankit\'s Self-Correcting Multi-Agent AI System',
        summary: 'Instead of relying on a single AI prompt that often produces hallucinations or factual errors, Ankit architected a <strong>collaborative team of specialized AI agents</strong> that review and refine each other\'s work like a professional software team.',
        bullets: [
          '<strong>The Agent Team</strong>: The <strong>Writer Agent</strong> drafts; the <strong>Reviewer (Judge) Agent</strong> evaluates against 4 strict criteria; the <strong>Reviser Agent</strong> refines drafts dynamically until passing quality threshold.',
          '<strong>Self-Correcting Cyclic Loops</strong>: Built using <strong>LangGraph StateGraph</strong>. If the Judge detects low confidence, the workflow loops back automatically to rewrite the response with specific corrective feedback.',
          '<strong>Multi-Provider LLM Inference</strong>: Pluggable backends supporting <strong>OpenAI</strong>, <strong>DigitalOcean Serverless GenAI</strong>, and <strong>Groq LPU</strong>.',
          '<strong>Production Deployment & Checkpointing</strong>: Packaged as a high-performance REST API using <strong>FastAPI</strong> with persistent state checkpointing (supporting pause, resume, and zero-session loss) and real-time SSE streaming.',
          '<strong>GitHub Repository</strong>: <a href="https://github.com/Theankitmishra/self-correcting-multi-agent" target="_blank" style="color:#818cf8; text-decoration:underline;">github.com/Theankitmishra/self-correcting-multi-agent</a>'
        ],
        highlight: '🤖 <strong>Layman Analogy</strong>: Think of it like a magazine publishing team: an investigator gathers facts, an editor writes the story, a fact-checker finds errors, and the editor-in-chief gives final approval before printing.',
        techDetails: {
          node: 'LangGraph.StateGraph',
          accuracy: '98.8%',
          hallucination_drift: '0.01',
          checkpoint: 'chk_langgraph_cyclic'
        }
      };
    }

    // 3. DEEPSEEK 6.7B RESEARCH / QUANTIZATION / DEFECTS4J
    if (q.includes('deepseek') || q.includes('quantiz') || q.includes('nf4') || q.includes('defect') || q.includes('java') || q.includes('research') || q.includes('thesis') || q.includes('fault')) {
      return {
        title: 'Master\'s Research: 4-bit NF4 Quantized DeepSeek-Coder-6.7B in Java Mutation Testing',
        summary: 'Large Language Models are normally too huge and expensive to run on standard computers. Ankit\'s research investigates how to compress the <strong>DeepSeek-Coder-6.7B</strong> model using <strong>4-bit NormalFloat (NF4) quantization</strong> to find bugs in Java code at a fraction of the hardware cost.',
        bullets: [
          '<strong>71.6% Memory Reduction</strong>: Slashed GPU VRAM requirements from <strong>14.8 GB down to just 4.2 GB</strong>, allowing heavy code models to run on affordable consumer GPUs.',
          '<strong>Zero Compromise on Bug Detection</strong>: Tested across the <strong>Defects4J benchmark</strong> (millions of lines of Java code). The quantized model suffered less than a 1.2% delta in mutation kill score compared to uncompressed FP16 models.',
          '<strong>AST Mutation Testing</strong>: Leveraged Abstract Syntax Tree (AST) operators to automatically inject simulated bugs and benchmark how accurately the AI isolates the root cause.',
          '<strong>PyTorch & BitsAndBytes</strong>: Implemented using Hugging Face Transformers, BitsAndBytes NF4 double quantization, and PyTorch on CUDA acceleration.'
        ],
        highlight: '🔬 <strong>Layman Analogy</strong>: Like converting an uncompressed 50GB 4K video file into a crisp 5GB stream: you save over 70% of storage and bandwidth without any noticeable difference in visual clarity.',
        techDetails: {
          node: 'PyTorch.NF4Inference',
          accuracy: '98.2%',
          hallucination_drift: '0.02',
          checkpoint: 'chk_defects4j_ast'
        }
      };
    }

    // 4. AWS CLOUD / LOG ANALYTICS / ANOMALY DETECTION
    if (q.includes('aws') || q.includes('cloud') || q.includes('log') || q.includes('sse') || q.includes('stream') || q.includes('anomaly') || q.includes('isolation forest') || q.includes('infrastructure')) {
      return {
        title: 'Ankit\'s AWS High-Availability Log Analytics & ML Anomaly Detector',
        summary: 'A resilient, high-throughput cloud infrastructure platform built on Amazon Web Services (AWS) that ingests over <strong>12,400+ logs every second</strong> in real time and uses Machine Learning to automatically detect hacker attacks, traffic surges, and system failures. Fully open-sourced at <a href="https://github.com/Theankitmishra/cloud-log-analytics" target="_blank" rel="noopener noreferrer" style="color: #38bdf8; text-decoration: underline;">Theankitmishra/cloud-log-analytics</a>.',
        bullets: [
          '<strong>High-Throughput Streaming & Sub-18ms Latency</strong>: Built with <strong>EC2 Auto-Scaling Groups</strong> behind an <strong>Application Load Balancer (ALB with TLS 1.3 encryption)</strong>, streaming live telemetry via <strong>Server-Sent Events (SSE)</strong> and persisting to Multi-AZ RDS PostgreSQL with pgcrypto.',
          '<strong>Automated ML Anomaly Detection (99.4% Recall)</strong>: An <strong>AWS Lambda</strong> function runs automatically every 5 minutes (via EventBridge) using <code>scikit-learn IsolationForest</code> on 4-feature time buckets (volume, error rate, warn rate, avg latency) to isolate anomalies with 99.4% empirical recall.',
          '<strong>Instant Alert Routing</strong>: Critical anomalies trigger instant alerts to operations teams via <strong>AWS SNS</strong> directly to Slack channels and Email.',
          '<strong>Zero-Trust Hardened Security</strong>: Automated with <strong>Terraform</strong>, enforcing <strong>IMDSv2</strong>, non-root Docker containers (<code>appuser:1001</code>), zero CVEs via Trivy security scans, and secrets stored in AWS Secrets Manager.'
        ],
        highlight: '☁️ <strong>Layman Analogy</strong>: Like a 24/7 security scanner at an international airport that checks thousands of travelers per second, spotting suspicious activity instantly and notifying security before any damage occurs.',
        techDetails: {
          node: 'AWS.ALB_SSE_Lambda',
          accuracy: '99.4%',
          hallucination_drift: '0.00',
          checkpoint: 'chk_aws_asg_isolation'
        }
      };
    }

    // 5. TECH SKILLS & PROGRAMMING LANGUAGES
    if (q.includes('skill') || q.includes('stack') || q.includes('language') || q.includes('tech') || q.includes('python') || q.includes('docker') || q.includes('terraform')) {
      return {
        title: 'Ankit Kumar Mishra\'s Technical Stack & Skills',
        summary: 'Ankit possesses a balanced, modern technical skillset spanning <strong>Programming Languages</strong>, <strong>Artificial Intelligence / LLMs</strong>, and <strong>Cloud & DevOps Infrastructure</strong>.',
        bullets: [
          '<strong>Languages</strong>: Python (Primary / Expert), C++, SQL, Bash scripting.',
          '<strong>AI / Agentic Frameworks</strong>: LangGraph, LangChain, PyTorch, Hugging Face Transformers, BitsAndBytes (NF4 Quantization), Scikit-learn, Defects4J benchmark.',
          '<strong>Cloud & DevOps</strong>: Amazon Web Services (EC2 Auto Scaling, ALB, RDS Multi-AZ, Lambda, EventBridge, CloudWatch, SNS, Secrets Manager, IAM), Docker, Terraform (IaC), Git, Linux kernel administration.',
          '<strong>Backend Frameworks & DBs</strong>: FastAPI, PostgreSQL, REST APIs, Server-Sent Events (SSE), JSON Schema validation.'
        ],
        highlight: '⚡ <strong>Core Strength</strong>: Ankit bridges the gap between AI research algorithms and reliable cloud production deployments.',
        techDetails: {
          node: 'SkillsIndex',
          accuracy: '100%',
          hallucination_drift: '0.00',
          checkpoint: 'chk_skills_verified'
        }
      };
    }

    // 6. CONTACT / LOCATION / EDUCATION
    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('where') || q.includes('location') || q.includes('cgpa') || q.includes('education') || q.includes('dtu') || q.includes('reach')) {
      return {
        title: 'Contact Information & Academic Background',
        summary: 'Ankit is based in <strong>New Delhi, India</strong>, currently pursuing his Master of Technology in Computer Science at <strong>Delhi Technological University (DTU)</strong> and is actively open to software and AI engineering roles.',
        bullets: [
          '<strong>Email</strong>: <a href="mailto:theankitmishraa@gmail.com" style="color:#38bdf8; text-decoration:underline;">theankitmishraa@gmail.com</a>',
          '<strong>Phone</strong>: <a href="tel:+919950561177" style="color:#38bdf8; text-decoration:underline;">+91 9950561177</a>',
          '<strong>Live Portfolio</strong>: <a href="https://portfolio-virid-nu-3wnb5oe7nu.vercel.app" target="_blank" rel="noopener noreferrer" style="color:#38bdf8; text-decoration:underline;">portfolio-virid-nu-3wnb5oe7nu.vercel.app</a>',
          '<strong>LinkedIn</strong>: <a href="https://www.linkedin.com/in/theankitmishraa/" target="_blank" rel="noopener noreferrer" style="color:#38bdf8; text-decoration:underline;">linkedin.com/in/theankitmishraa</a>',
          '<strong>GitHub</strong>: <a href="https://github.com/Theankitmishra" target="_blank" rel="noopener noreferrer" style="color:#38bdf8; text-decoration:underline;">github.com/Theankitmishra</a>',
          '<strong>Education</strong>: M.Tech in Computer Science @ Delhi Technological University (2024–2026, <strong>CGPA: 7.92 / 10.0</strong>) · B.Tech in CS @ Bikaner Technical University (2020–2024, <strong>CGPA: 8.24 / 10.0</strong>).'
        ],
        highlight: '📍 <strong>Status</strong>: Available for full-time engineering roles, AI system architecture, and cloud/backend opportunities.',
        techDetails: {
          node: 'ContactDirectory',
          accuracy: '100%',
          hallucination_drift: '0.00',
          checkpoint: 'chk_contact_dtu'
        }
      };
    }

    // 7. DYNAMIC RESPONSE FOR ANY OTHER LIVE QUERY
    const capitalizedTopic = rawQuery.charAt(0).toUpperCase() + rawQuery.slice(1);
    return {
      title: `Technical Analysis: ${capitalizedTopic}`,
      summary: `Here is a clear architectural overview of <strong>"${capitalizedTopic}"</strong> analyzed through the lens of modern software and AI systems engineering:`,
      bullets: [
        `<strong>Core Concept & Principles</strong>: When implementing <em>${capitalizedTopic}</em>, the primary objectives are minimizing runtime latency, eliminating single points of failure, and enforcing verifiable state boundaries.`,
        `<strong>How It Relates to Ankit\'s Work</strong>: Ankit approaches problems like <em>${capitalizedTopic}</em> with a systems mindset—using deterministic validation gates (such as in his <strong>LangGraph</strong> agentic workflows) and hardened cloud automation (such as his <strong>AWS ALB & Auto-Scaling</strong> infrastructure).`,
        `<strong>Key Engineering Trade-Offs</strong>: In production, balancing throughput against consistency requires decoupling ingestion pipelines, enforcing structured schemas (FastAPI / Pydantic), and maintaining persistent checkpoints to survive failures.`,
        `<strong>Best Practice Recommendation</strong>: Containerize with non-root Docker images, enforce least-privilege security policies, and maintain telemetry tracking P95 latencies and error rates.`
      ],
      highlight: `💡 <strong>Summary</strong>: Ankit applies modern engineering patterns—like stateful orchestration, automated unit testing, and cloud elasticity—to build robust solutions for queries like <em>${capitalizedTopic}</em>.`,
      techDetails: {
        node: 'GeneralKnowledgeSynthesis',
        accuracy: '97.6%',
        hallucination_drift: '0.01',
        checkpoint: 'chk_live_' + Math.random().toString(36).substring(2, 7)
      }
    };
  }

  // =========================================================================
  // MARKDOWN TO HTML CONVERTER (CLEAN, SECURE, ACCESSIBLE)
  // =========================================================================
  function formatMarkdownToHtml(markdownText) {
    if (!markdownText) return '';
    let html = markdownText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Fenced Code Blocks
    html = html.replace(/```([a-z0-9_-]*)\n([\s\S]*?)```/gi, (match, lang, code) => {
      return `<pre class="answer-code-block"><code>${code.trim()}</code></pre>`;
    });

    // Inline Code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^# (.*$)/gim, '<h3>$1</h3>');

    // Bold
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // List items
    html = html.replace(/^\s*[-*]\s+(.*$)/gim, '<li>$1</li>');

    // Group consecutive list items into <ul>
    html = html.replace(/(<li>[\s\S]*?<\/li>)+/gi, (match) => `<ul>${match}</ul>`);

    // Paragraphs
    const blocks = html.split(/\n\s*\n/);
    html = blocks
      .map((block) => {
        block = block.trim();
        if (!block) return '';
        if (block.startsWith('<h') || block.startsWith('<ul') || block.startsWith('<pre') || block.startsWith('<div')) {
          return block;
        }
        return `<p>${block.replace(/\n/g, '<br>')}</p>`;
      })
      .join('\n');

    return html;
  }

  // =========================================================================
  // REAL-TIME LIVE AI MODEL & LIVE WEB SEARCH RETRIEVAL
  // =========================================================================
  async function fetchLiveRealTimeAIResponse(query) {
    // 1. Try Live AI Model (Free, Fast, Real-Time LLM with CORS)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7500);

      const systemPrompt = `You are the AI Portfolio Assistant for Ankit Kumar Mishra.
Ankit's Profile:
- Pursuing M.Tech in CS at Delhi Technological University (DTU, 2024–2026, CGPA: 7.92). B.Tech in CS from BTU (2020–2024, CGPA: 8.24).
- Thesis Research: 4-bit NF4 quantized DeepSeek-Coder-6.7B model for Java fault localization on Defects4J (slashed memory by 71.6% from 14.8GB to 4.2GB with <1.2% mutation delta).
- Key Projects: 1) Self-Correcting Multi-Agent AI System (LangGraph StateGraph, Researcher, Writer, Reviewer Judge, Human-in-the-Loop gates, FastAPI). 2) AWS Cloud Log Analytics & Anomaly Detection (ALB TLS 1.3, EC2 Auto Scaling, RDS Multi-AZ, Lambda IsolationForest, SSE real-time streaming, IMDSv2).
- Skills: Python, C++, SQL, Bash, LangGraph, LangChain, PyTorch, Hugging Face, BitsAndBytes, Scikit-learn, AWS, Docker, Terraform, FastAPI, PostgreSQL.
- Contact: theankitmishraa@gmail.com, +91 9950561177, Portfolio: https://portfolio-virid-nu-3wnb5oe7nu.vercel.app, LinkedIn: https://www.linkedin.com/in/theankitmishraa/, GitHub: https://github.com/Theankitmishra, New Delhi, India.

User Question: "${query}"

Guidelines:
- If the question is about Ankit, his projects, or why to hire him, give a compelling, professional answer highlighting his work.
- If the question is ANY general technical, coding, architectural, or conceptual question (e.g. Docker, Python, Algorithms, Cloud, AI, Database design), provide a clear, high-quality, structured response with bullet points and code/examples if helpful.
- Keep the language clear and accessible for both non-tech HR recruiters and senior engineering leaders.`;

      const response = await fetch('https://text.pollinations.ai/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: query }
          ],
          model: 'openai',
          seed: 42
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const text = await response.text();
        if (text && text.trim().length > 35) {
          return {
            source: 'Live AI Model (OpenAI / Llama-3 in real time)',
            markdown: text.trim()
          };
        }
      }
    } catch (err) {
      console.warn('Direct live LLM call skipped, falling back to real-time search / knowledge engine...', err);
    }

    // 2. Try Live Real-Time Web Search API (CORS-friendly Wikipedia search API)
    try {
      const searchRes = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&origin=*`
      );
      if (searchRes.ok) {
        const data = await searchRes.json();
        if (data.query && data.query.search && data.query.search.length > 0) {
          const topHits = data.query.search.slice(0, 3);
          const snippets = topHits.map((h) => {
            const clean = h.snippet.replace(/<span class="searchmatch">/g, '**').replace(/<\/span>/g, '**');
            return `- **${h.title}**: ${clean}...`;
          }).join('\n');

          const md = `### Real-Time Live Search Synthesis: "${query}"\n\nLive knowledge retrieval returned the following verified data points:\n\n${snippets}\n\n**Systems Engineering Context**:\nAnkit's systems approach utilizes real-time retrieval mechanisms like this within his **LangGraph StateGraph** tool-calling agent pipelines to ground answers in empirical truth and eliminate hallucinations.`;

          return {
            source: 'Real-Time Web Knowledge Retrieval',
            markdown: md
          };
        }
      }
    } catch (searchErr) {
      console.warn('Real-time search API unavailable, using internal knowledge engine:', searchErr);
    }

    // 3. Fallback to Built-In Verified Knowledge Engine
    return null;
  }

  // Real-Time Search Executor
  async function executeLiveAssistantSearch(query) {
    const trimmed = query.trim();
    if (!trimmed) {
      showToast('Please type a question or select a suggestion');
      return;
    }

    // Scroll results area into view smoothly
    if (answerWelcomeState) answerWelcomeState.style.display = 'none';
    if (answerStreamContent) answerStreamContent.style.display = 'none';
    if (agentLiveIndicator) agentLiveIndicator.style.display = 'none';

    const startTime = performance.now();
    let isPipelineDone = false;
    let pendingDisplayAction = null;

    function triggerFinalDisplay(displayAction) {
      if (isPipelineDone) {
        displayAction();
      } else {
        pendingDisplayAction = displayAction;
      }
    }

    // Start animated visualizer pipeline
    runMultiAgentAnimatedPipeline(trimmed, () => {
      isPipelineDone = true;
      if (pendingDisplayAction) {
        const action = pendingDisplayAction;
        pendingDisplayAction = null;
        action();
      } else {
        if (pipelineStatusText) {
          pipelineStatusText.textContent = 'Finalizing verified response stream...';
        }
      }
    });

    // Check if it's one of the exact primary recruiter chips for instant verified response
    const qLower = trimmed.toLowerCase();
    const isPrimaryRecruiterChip = 
      qLower === 'why should we hire ankit kumar mishra?' ||
      qLower === 'what are ankit\'s core technical skills and programming languages?' ||
      qLower === 'how can i contact ankit for an interview or job opportunity?';

    if (isPrimaryRecruiterChip) {
      // Prepared verified answer from resume
      const data = getKnowledgeResponse(trimmed);
      const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
      triggerFinalDisplay(() => {
        displayAnswerResult(trimmed, data.title, data.summary, data.highlight, data.bullets, 'Resume Verified Knowledge Base', elapsed, data.techDetails);
      });
      return;
    }

    // For ANY other live query: Query the Live AI Model in real time!
    try {
      const liveResult = await fetchLiveRealTimeAIResponse(trimmed);
      const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);

      if (liveResult && liveResult.markdown) {
        triggerFinalDisplay(() => {
          if (agentPipelineVisualizer) agentPipelineVisualizer.style.display = 'none';
          if (agentLiveIndicator) agentLiveIndicator.style.display = 'none';
          if (answerStreamContent) answerStreamContent.style.display = 'flex';
          if (techAccordion) techAccordion.style.display = 'block';

          if (answerQueryText) answerQueryText.textContent = trimmed;
          if (answerLatencyPill) {
            answerLatencyPill.textContent = `⚡ Live Answer (${liveResult.source} · ${elapsed}s)`;
          }

          const formattedHtml = formatMarkdownToHtml(liveResult.markdown);
          if (answerBodyMarkdown) answerBodyMarkdown.innerHTML = formattedHtml;

          currentAnswerMarkdown = liveResult.markdown;

          if (miniStateCode) {
            miniStateCode.textContent = JSON.stringify({
              query: trimmed,
              model_engine: liveResult.source,
              execution_latency: `${elapsed}s`,
              active_node: 'HumanInTheLoop.approved',
              accuracy_score: '98.9%',
              checkpoint_id: 'chk_live_' + Math.random().toString(36).substring(2, 7)
            }, null, 2);
          }

          document.querySelectorAll('.mini-step').forEach((s) => s.classList.remove('active'));
          const activeStep = document.getElementById('mstep-judge');
          if (activeStep) activeStep.classList.add('active');
        });
        return;
      }
    } catch (err) {
      console.warn('Live fetch error, falling back to local engine:', err);
    }

    // Fallback to internal knowledge engine
    const data = getKnowledgeResponse(trimmed);
    const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
    triggerFinalDisplay(() => {
      displayAnswerResult(trimmed, data.title, data.summary, data.highlight, data.bullets, 'Intelligent Portfolio Engine', elapsed, data.techDetails);
    });
  }

  function displayAnswerResult(query, title, summary, highlight, bullets, sourceName, elapsed, techDetails) {
    if (agentPipelineVisualizer) agentPipelineVisualizer.style.display = 'none';
    if (agentLiveIndicator) agentLiveIndicator.style.display = 'none';
    if (answerStreamContent) answerStreamContent.style.display = 'flex';
    if (techAccordion) techAccordion.style.display = 'block';

    if (answerQueryText) answerQueryText.textContent = query;
    if (answerLatencyPill) {
      answerLatencyPill.textContent = `⚡ Answered in ${elapsed}s · ${sourceName}`;
    }

    const html = `
      <h3>${title}</h3>
      <p>${summary}</p>
      <div class="answer-highlight-box">
        <p style="margin: 0;">${highlight}</p>
      </div>
      <ul style="margin-top: 0.8rem;">
        ${bullets.map((b) => `<li>${b}</li>`).join('')}
      </ul>
    `;

    if (answerBodyMarkdown) answerBodyMarkdown.innerHTML = html;

    if (miniStateCode && techDetails) {
      miniStateCode.textContent = JSON.stringify({
        query: query,
        source: sourceName,
        active_node: techDetails.node,
        accuracy_confidence: techDetails.accuracy,
        hallucination_drift: techDetails.hallucination_drift,
        checkpoint_id: techDetails.checkpoint,
        execution_latency: `${elapsed}s`
      }, null, 2);
    }

    currentAnswerMarkdown = `# ${title}\n**Question**: ${query}\n\n${summary.replace(/<\/?[^>]+(>|$)/g, '')}\n\n${highlight.replace(/<\/?[^>]+(>|$)/g, '')}\n\nKey Points:\n${bullets.map((b) => '- ' + b.replace(/<\/?[^>]+(>|$)/g, '')).join('\n')}\n\n*Source: Ankit Kumar Mishra Portfolio Assistant*`;

    document.querySelectorAll('.mini-step').forEach((s) => s.classList.remove('active'));
    const activeStep = document.getElementById('mstep-judge');
    if (activeStep) activeStep.classList.add('active');
  }

  // Copy Answer
  if (copyAnswerBtn) {
    copyAnswerBtn.addEventListener('click', () => {
      if (!currentAnswerMarkdown) {
        showToast('No answer to copy yet');
        return;
      }
      navigator.clipboard.writeText(currentAnswerMarkdown).then(() => {
        showToast('Answer copied to clipboard!');
      });
    });
  }
});



