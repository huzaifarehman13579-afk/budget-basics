/* =========================================================
   BUDGETBEE — ULTRA ANIMATED SCRIPT
   Scroll + Particles + Parallax + 3D Cards + Counters
   Calculator + Quiz + Savings + Expenses + Chatbot
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =====================================================
       HELPERS
    ===================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];

    const clamp = (value, min, max) =>
        Math.min(Math.max(value, min), max);

    const money = value =>
        `Rs. ${Math.round(Number(value) || 0).toLocaleString()}`;

    const escapeHTML = value =>
        String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    const loader = document.createElement("div");

    loader.className = "bb-page-loader";

    loader.innerHTML = `
        <div class="bb-loader-content">
            <div class="bb-loader-bee">
    <i class="bi bi-wallet2"></i>
</div>
            <div class="bb-loader-ring"></div>
            <div class="bb-loader-text">
                BUDGET<span>BEE</span>
            </div>
        </div>
    `;

    document.body.prepend(loader);

    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.classList.add("loaded");

            setTimeout(() => {
                loader.remove();
            }, 900);
        }, 500);
    });


    /* =====================================================
       DYNAMIC BACKGROUND
    ===================================================== */

    const background = document.createElement("div");

    background.className = "bb-animated-background";

    background.innerHTML = `
        <div class="bb-orb bb-orb-1"></div>
        <div class="bb-orb bb-orb-2"></div>
        <div class="bb-orb bb-orb-3"></div>
        <div class="bb-grid"></div>
        <div class="bb-noise"></div>
    `;

    document.body.prepend(background);


    /* =====================================================
       PARTICLE SYSTEM
    ===================================================== */

    const particleBox = document.createElement("div");

    particleBox.className = "bb-particles";

    document.body.appendChild(particleBox);

    const particleCount =
        window.innerWidth < 768 ? 35 : 75;

    for (let i = 0; i < particleCount; i++) {

        const particle =
            document.createElement("span");

        particle.className = "bb-particle";

        const size =
            Math.random() * 4 + 1;

        particle.style.width =
            `${size}px`;

        particle.style.height =
            `${size}px`;

        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.top =
            `${Math.random() * 100}%`;

        particle.style.animationDelay =
            `${Math.random() * -12}s`;

        particle.style.animationDuration =
            `${7 + Math.random() * 12}s`;

        particleBox.appendChild(particle);
    }


    /* =====================================================
       MOUSE FOLLOW GLOW
    ===================================================== */

    const cursorGlow =
        document.createElement("div");

    cursorGlow.className =
        "bb-cursor-glow";

    document.body.appendChild(cursorGlow);

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener("mousemove", e => {

        mouseX = e.clientX;
        mouseY = e.clientY;

    });

    function animateGlow() {

        glowX += (mouseX - glowX) * 0.12;
        glowY += (mouseY - glowY) * 0.12;

        cursorGlow.style.transform =
            `translate3d(${glowX}px, ${glowY}px, 0)`;

        requestAnimationFrame(animateGlow);
    }

    animateGlow();


    /* =====================================================
       NAVBAR
    ===================================================== */

    const navbar = $(".navbar");

    function navbarScroll() {

        if (!navbar) return;

        navbar.classList.toggle(
            "bb-nav-scrolled",
            window.scrollY > 40
        );
    }

    window.addEventListener(
        "scroll",
        navbarScroll,
        { passive: true }
    );

    navbarScroll();


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    $$('a[href^="#"]').forEach(link => {

        link.addEventListener("click", e => {

            const targetID =
                link.getAttribute("href");

            if (!targetID || targetID === "#")
                return;

            const target =
                document.querySelector(targetID);

            if (!target)
                return;

            e.preventDefault();

            const navHeight =
                navbar?.offsetHeight || 0;

            const position =
                target.getBoundingClientRect().top +
                window.scrollY -
                navHeight -
                15;

            window.scrollTo({
                top: position,
                behavior: "smooth"
            });

            const menu =
                $(".navbar-collapse");

            if (
                menu &&
                menu.classList.contains("show") &&
                window.bootstrap
            ) {
                const collapse =
                    bootstrap.Collapse.getInstance(menu) ||
                    new bootstrap.Collapse(
                        menu,
                        { toggle: false }
                    );

                collapse.hide();
            }
        });
    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealSelectors = [
        "section",
        ".section-heading",
        ".card",
        ".feature-card",
        ".info-card",
        ".calculator-card",
        ".quiz-card",
        ".goal-card",
        ".expense-card",
        ".mistake-card",
        ".contact-info",
        ".contact-form",
        ".module-card",
        ".glass-card"
    ];

    const revealElements =
        $$(revealSelectors.join(","));

    revealElements.forEach((element, index) => {

        if (
            element.classList.contains("hero") ||
            element.closest(".navbar")
        ) {
            return;
        }

        element.classList.add("bb-reveal");

        element.style.setProperty(
            "--bb-delay",
            `${Math.min(index % 6, 5) * 70}ms`
        );
    });


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting)
                        return;

                    entry.target.classList.add(
                        "bb-visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );
                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px"
            }
        );


    $$(".bb-reveal").forEach(el =>
        revealObserver.observe(el)
    );


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const hero =
        $(".hero") ||
        $(".hero-section") ||
        $("#home");

    let scrollY = 0;

    window.addEventListener(
        "scroll",
        () => {
            scrollY = window.scrollY;
        },
        { passive: true }
    );

    function heroAnimation() {

        if (hero && scrollY < window.innerHeight * 1.3) {

            const amount =
                Math.min(scrollY * 0.12, 100);

            hero.style.setProperty(
                "--bb-parallax",
                `${amount}px`
            );
        }

        requestAnimationFrame(heroAnimation);
    }

    heroAnimation();


    /* =====================================================
       3D CARD TILT
    ===================================================== */

    const tiltCards = $$
        (
            ".card, .feature-card, .info-card, " +
            ".calculator-card, .quiz-card, .goal-card, " +
            ".expense-card, .glass-card, .module-card"
        )
        .filter(card =>
            !card.closest(".navbar")
        );

    tiltCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            e => {

                if (window.innerWidth < 800)
                    return;

                const rect =
                    card.getBoundingClientRect();

                const x =
                    e.clientX - rect.left;

                const y =
                    e.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) / centerY) * -5;

                const rotateY =
                    ((x - centerX) / centerX) * 5;

                card.style.transform =
                    `perspective(1000px)
                     translateY(-7px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     scale(1.015)`;

                card.style.setProperty(
                    "--bb-mx",
                    `${x}px`
                );

                card.style.setProperty(
                    "--bb-my",
                    `${y}px`
                );
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );
    });


    /* =====================================================
       MAGNETIC BUTTONS
    ===================================================== */

    $$(".btn-main, .btn-primary, .btn-glow, .btn-outline").forEach(button => {

        button.addEventListener("mousemove", e => {

            if (window.innerWidth < 700)
                return;

            const rect =
                button.getBoundingClientRect();

            const x =
                e.clientX - rect.left -
                rect.width / 2;

            const y =
                e.clientY - rect.top -
                rect.height / 2;

            button.style.transform =
                `translate(${x * 0.12}px, ${y * 0.12}px)`;

        });

        button.addEventListener("mouseleave", () => {
            button.style.transform = "";
        });

    });


    /* =====================================================
       RIPPLE BUTTON EFFECT
    ===================================================== */

    $$("button, .btn-main, .btn-primary").forEach(button => {

        button.addEventListener("click", e => {

            const rect =
                button.getBoundingClientRect();

            const ripple =
                document.createElement("span");

            ripple.className =
                "bb-ripple";

            const size =
                Math.max(
                    rect.width,
                    rect.height
                );

            ripple.style.width =
                `${size}px`;

            ripple.style.height =
                `${size}px`;

            ripple.style.left =
                `${e.clientX - rect.left - size / 2}px`;

            ripple.style.top =
                `${e.clientY - rect.top - size / 2}px`;

            button.appendChild(ripple);

            setTimeout(
                () => ripple.remove(),
                700
            );

        });

    });


    /* =====================================================
       LIVE CLOCK
    ===================================================== */

    const clock = $("#clock");

    function updateClock() {

        if (!clock)
            return;

        const now =
            new Date();

        clock.textContent =
            now.toLocaleTimeString(
                [],
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                }
            );
    }

    updateClock();

    setInterval(
        updateClock,
        1000
    );


    /* =====================================================
       THEME TOGGLE
    ===================================================== */

    const themeToggle =
        $("#themeToggle");

    const savedTheme =
        localStorage.getItem(
            "budgetbasics-theme"
        );

    if (savedTheme === "light") {
        document.body.classList.add("light");
    }

    function updateThemeIcon() {

        if (!themeToggle)
            return;

        const icon =
            $("i", themeToggle);

        if (!icon)
            return;

        icon.className =
            document.body.classList.contains("light")
                ? "bi bi-moon-stars-fill"
                : "bi bi-sun-fill";
    }

    updateThemeIcon();

    themeToggle?.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light"
            );

            localStorage.setItem(
                "budgetbasics-theme",
                document.body.classList.contains("light")
                    ? "light"
                    : "dark"
            );

            updateThemeIcon();

            document.body.classList.add(
                "bb-theme-flash"
            );

            setTimeout(() => {
                document.body.classList.remove(
                    "bb-theme-flash"
                );
            }, 500);
        }
    );


    /* =====================================================
       50 / 30 / 20 CALCULATOR
    ===================================================== */

    const incomeInput =
        $("#incomeInput");

    const calculateRule =
        $("#calculateRule");

    const needsAmount =
        $("#needsAmount");

    const wantsAmount =
        $("#wantsAmount");

    const savingAmount =
        $("#savingAmount");

    const heroBudget =
        $("#heroBudget");

    const expenseIncome =
        $("#expenseIncome");


    function animateValue(
        element,
        target,
        prefix = "Rs. "
    ) {

        if (!element)
            return;

        const start =
            performance.now();

        const duration = 900;

        function frame(now) {

            const progress =
                clamp(
                    (now - start) / duration,
                    0,
                    1
                );

            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );

            const value =
                target * eased;

            element.textContent =
                prefix +
                Math.round(value)
                    .toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(frame);
            }
        }

        requestAnimationFrame(frame);
    }


    function calculateBudget() {

        const income =
            Number(incomeInput?.value);

        if (!income || income <= 0) {

            showToast(
                "Please enter a valid income.",
                "warning"
            );

            incomeInput?.focus();

            return;
        }

        const needs =
            income * 0.50;

        const wants =
            income * 0.30;

        const savings =
            income * 0.20;


        animateValue(
            needsAmount,
            needs
        );

        animateValue(
            wantsAmount,
            wants
        );

        animateValue(
            savingAmount,
            savings
        );


        if (heroBudget)
            heroBudget.textContent =
                money(income);

        if (expenseIncome)
            expenseIncome.textContent =
                money(income);

        renderExpenses();


        animateBudgetBars(
            needs,
            wants,
            savings
        );


        showToast(
            "Your smart 50/30/20 budget is ready! 🐝",
            "success"
        );
    }


    calculateRule?.addEventListener(
        "click",
        calculateBudget
    );


    incomeInput?.addEventListener(
        "keydown",
        e => {

            if (e.key === "Enter")
                calculateBudget();

        }
    );


    function animateBudgetBars(
        needs,
        wants,
        savings
    ) {

        const bars = [
            ["#needsBar", 50],
            ["#wantsBar", 30],
            ["#savingBar", 20]
        ];

        bars.forEach(
            ([selector, value]) => {

                const bar =
                    $(selector);

                if (bar) {

                    bar.style.width =
                        "0%";

                    requestAnimationFrame(() => {

                        bar.style.width =
                            `${value}%`;

                    });
                }
            }
        );
    }


    /* =====================================================
       SAVINGS GOAL
    ===================================================== */

    const goalName =
        $("#goalName");

    const goalTarget =
        $("#goalTarget");

    const goalCurrent =
        $("#goalCurrent");

    const goalMonthly =
        $("#goalMonthly");

    const goalBar =
        $("#goalBar");

    const goalMonths =
        $("#goalMonths");

    const displayGoalName =
        $("#displayGoalName");

    const displayCurrent =
        $("#displayCurrent");

    const displayTarget =
        $("#displayTarget");

    const goalPercent =
        $("#goalPercent");

    const goalRemainingEl =
        $("#goalRemaining");

    const saveGoal =
        $("#createGoal") ||
        $("#saveGoal") ||
        $("[data-save-goal]");


    function updateGoal() {

        if (!goalTarget)
            return;

        const target =
            Number(goalTarget.value) || 0;

        const current =
            Number(goalCurrent?.value) || 0;

        const monthly =
            Number(goalMonthly?.value) || 0;


        if (displayGoalName)
            displayGoalName.textContent =
                goalName?.value.trim() || "New Goal";

        if (displayCurrent)
            displayCurrent.textContent =
                money(current);

        if (displayTarget)
            displayTarget.textContent =
                money(target);


        if (!target)
            return;

        const percentage =
            clamp(
                current / target * 100,
                0,
                100
            );


        if (goalPercent)
            goalPercent.textContent =
                `${Math.round(percentage)}%`;


        if (goalBar) {

            goalBar.style.width =
                "0%";

            requestAnimationFrame(() => {

                goalBar.style.width =
                    `${percentage}%`;

            });
        }


        const remaining =
            Math.max(
                target - current,
                0
            );


        if (goalRemainingEl)
            goalRemainingEl.textContent =
                money(remaining);


        if (!goalMonths)
            return;


        if (remaining <= 0) {

            goalMonths.innerHTML =
                `<span class="bb-complete">🎉 Goal Completed!</span>`;

        } else if (monthly > 0) {

            const months =
                Math.ceil(
                    remaining / monthly
                );

            goalMonths.textContent =
                `${months} month${months !== 1 ? "s" : ""} remaining`;

        } else {

            goalMonths.textContent =
                "Enter monthly saving amount";
        }
    }


    function saveSavingsGoal() {

        const data = {

            name:
                goalName?.value.trim() || "",

            target:
                Number(goalTarget?.value) || 0,

            current:
                Number(goalCurrent?.value) || 0,

            monthly:
                Number(goalMonthly?.value) || 0
        };


        if (
            !data.name ||
            data.target <= 0
        ) {

            showToast(
                "Enter a goal name and target.",
                "warning"
            );

            return;
        }


        localStorage.setItem(
            "budgetbasics-goal",
            JSON.stringify(data)
        );


        updateGoal();


        showToast(
            "Savings goal saved! 🎯",
            "success"
        );
    }


    saveGoal?.addEventListener(
        "click",
        saveSavingsGoal
    );


    [
        goalName,
        goalTarget,
        goalCurrent,
        goalMonthly
    ].forEach(input => {

        input?.addEventListener(
            "input",
            updateGoal
        );

    });


    try {

        const saved =
            JSON.parse(
                localStorage.getItem(
                    "budgetbasics-goal"
                )
            );

        if (saved) {

            if (goalName)
                goalName.value =
                    saved.name || "";

            if (goalTarget)
                goalTarget.value =
                    saved.target || "";

            if (goalCurrent)
                goalCurrent.value =
                    saved.current || "";

            if (goalMonthly)
                goalMonthly.value =
                    saved.monthly || "";

            updateGoal();
        }

    } catch { }


    /* =====================================================
       EXPENSE PLANNER
    ===================================================== */

    const addExpenseBtn =
        $("#addExpense");

    const expenseDate =
        $("#expenseDate");

    const expenseDescription =
        $("#expenseDescription");

    const expenseAmount =
        $("#expenseAmount");

    const expenseCategory =
        $("#expenseCategory");

    const expenseList =
        $("#expenseList");

    const expenseTotal =
        $("#totalExpenses");

    const remainingBalance =
        $("#remainingBalance");


    let expenses = [];

    try {

        expenses =
            JSON.parse(
                localStorage.getItem(
                    "budgetbasics-expenses"
                )
            ) || [];

    } catch {
        expenses = [];
    }


    function saveExpenses() {

        localStorage.setItem(
            "budgetbasics-expenses",
            JSON.stringify(expenses)
        );
    }


    function renderExpenses() {

        if (!expenseList)
            return;

        expenseList.innerHTML = "";

        let total = 0;


        expenses.forEach(
            (expense, index) => {

                total +=
                    Number(expense.amount) || 0;


                const row =
                    document.createElement("tr");

                row.className =
                    "bb-expense-enter";

                row.innerHTML = `

                    <td>${escapeHTML(expense.date || "-")}</td>
                    <td>${escapeHTML(expense.category)}</td>
                    <td>${escapeHTML(expense.description)}</td>
                    <td>${money(expense.amount)}</td>
                    <td>
                        <button
                            type="button"
                            class="delete-expense"
                            data-index="${index}"
                        >
                            <i class="bi bi-trash3"></i>
                        </button>
                    </td>
                `;

                expenseList.appendChild(row);
            }
        );


        if (expenseTotal)
            expenseTotal.textContent =
                money(total);


        const income =
            Number(
                String(expenseIncome?.textContent || "")
                    .replace(/[^0-9.]/g, "")
            ) || 0;

        const remaining =
            income - total;


        if (remainingBalance) {

            remainingBalance.textContent =
                money(remaining);

            remainingBalance.classList.toggle(
                "balance-danger",
                remaining < 0
            );

            remainingBalance.classList.toggle(
                "balance-success",
                remaining >= 0
            );
        }


        $$(".delete-expense").forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(
                                button.dataset.index
                            );

                        expenses.splice(
                            index,
                            1
                        );

                        saveExpenses();
                        renderExpenses();

                        showToast(
                            "Expense removed.",
                            "success"
                        );
                    }
                );
            }
        );
    }


    addExpenseBtn?.addEventListener(
        "click",
        () => {

            const description =
                expenseDescription?.value.trim();

            const amount =
                Number(expenseAmount?.value);

            const category =
                expenseCategory?.value ||
                "Misc";

            const date =
                expenseDate?.value ||
                new Date().toISOString().slice(0, 10);


            if (
                !description ||
                !amount ||
                amount <= 0
            ) {

                showToast(
                    "Enter a valid expense.",
                    "warning"
                );

                return;
            }


            expenses.push({

                description,
                amount,
                category,
                date

            });


            saveExpenses();
            renderExpenses();

            if (expenseDescription)
                expenseDescription.value = "";

            if (expenseAmount)
                expenseAmount.value = "";

            if (expenseDate)
                expenseDate.value = "";


            showToast(
                "Expense added successfully! 💰",
                "success"
            );
        }
    );


    expenseIncome?.addEventListener(
        "input",
        renderExpenses
    );


    renderExpenses();


    /* =====================================================
       QUIZ
    ===================================================== */

    const quizNumber =
        $("#quizNumber");

    const quizScore =
        $("#quizScore");

    const nextQuestion =
        $("#nextQuestion");

    const quizQuestion =
        $("#quizQuestion") ||
        $(".quiz-question");

    const quizOptions =
        $("#quizOptions");

    const quizFeedback =
        $("#quizFeedback");

    const quizProgress =
        $("#quizProgress");


    const questions = [

        {
            q:
                "Buying groceries for your home is a:",
            a: "need"
        },

        {
            q:
                "Buying a new gaming console when your old one works is a:",
            a: "want"
        },

        {
            q:
                "Paying your education fees is a:",
            a: "need"
        },

        {
            q:
                "Buying expensive shoes only for fashion is a:",
            a: "want"
        },

        {
            q:
                "Necessary transportation is a:",
            a: "need"
        }

    ];


    let questionIndex = 0;
    let quizPoints = 0;
    let answered = false;


    function renderQuiz() {

        if (!questions.length || !quizOptions)
            return;


        const question =
            questions[questionIndex];


        if (quizQuestion) {

            quizQuestion.classList.remove(
                "bb-question-in"
            );

            void quizQuestion.offsetWidth;

            quizQuestion.classList.add(
                "bb-question-in"
            );

            quizQuestion.textContent =
                question.q;
        }


        if (quizNumber)
            quizNumber.textContent =
                `${questionIndex + 1}`;


        if (quizScore)
            quizScore.textContent =
                `${quizPoints}`;


        if (quizProgress)
            quizProgress.style.width =
                `${(questionIndex / questions.length) * 100}%`;


        if (quizFeedback) {

            quizFeedback.textContent = "";
            quizFeedback.className = "quiz-feedback";
        }


        answered = false;

        if (nextQuestion)
            nextQuestion.disabled = true;


        quizOptions.innerHTML = `
            <button type="button" class="quiz-option" data-answer="need">
                <i class="bi bi-check-circle"></i> Need
            </button>
            <button type="button" class="quiz-option" data-answer="want">
                <i class="bi bi-star"></i> Want
            </button>
        `;
    }


    quizOptions?.addEventListener(
        "click",
        e => {

            const button =
                e.target.closest(".quiz-option");

            if (!button || answered)
                return;

            answered = true;


            const answer =
                (button.dataset.answer || "")
                    .toLowerCase();

            const correct =
                questions[questionIndex].a;


            if (answer === correct) {

                quizPoints++;

                button.classList.add("correct");

                if (quizFeedback) {
                    quizFeedback.textContent =
                        "Correct! 🐝✨";
                    quizFeedback.className =
                        "quiz-feedback ok";
                }

                showToast(
                    "Correct! 🐝✨",
                    "success"
                );

            } else {

                button.classList.add("wrong");

                $$(".quiz-option", quizOptions)
                    .find(btn => btn.dataset.answer === correct)
                    ?.classList.add("correct");

                if (quizFeedback) {
                    quizFeedback.textContent =
                        `Not quite — that's usually a ${correct}.`;
                    quizFeedback.className =
                        "quiz-feedback bad";
                }

                showToast(
                    `Correct answer: ${correct}`,
                    "warning"
                );
            }


            if (quizScore)
                quizScore.textContent =
                    `${quizPoints}`;


            $$(".quiz-option", quizOptions).forEach(btn => {
                btn.style.pointerEvents = "none";
            });


            if (nextQuestion)
                nextQuestion.disabled = false;
        }
    );


    nextQuestion?.addEventListener(
        "click",
        () => {

            if (!answered)
                return;

            questionIndex++;


            if (
                questionIndex >=
                questions.length
            ) {

                if (quizProgress)
                    quizProgress.style.width = "100%";

                showToast(
                    `Quiz complete! ${quizPoints}/${questions.length} correct 🎉`,
                    "success"
                );

                questionIndex = 0;
                quizPoints = 0;
            }


            renderQuiz();
        }
    );


    renderQuiz();


    /* =====================================================
       LEARNING SEARCH
    ===================================================== */

    const learningSearch =
        $("#learningSearch");

    const searchResults =
        $("#searchResults");


    const learningData = [

        {
            title:
                "Budgeting Basics",

            description:
                "Learn income, expenses, needs and savings.",

            link:
                "#budgeting"
        },

        {
            title:
                "Income",

            description:
                "Understand what counts as income and why it's the starting point of any budget.",

            link:
                "#budgeting"
        },

        {
            title:
                "Fixed & Variable Expenses",

            description:
                "Know the difference between costs that stay the same and costs that change.",

            link:
                "#budgeting"
        },

        {
            title:
                "Sample Student Budget",

            description:
                "See a simple example budget built for a student's monthly income.",

            link:
                "#budgeting"
        },

        {
            title:
                "Needs vs Wants",

            description:
                "Learn essential and optional spending, then test yourself with the quiz.",

            link:
                "#needs"
        },

        {
            title:
                "Needs vs Wants Quiz",

            description:
                "Classify five everyday purchases and see your score instantly.",

            link:
                "#needs"
        },

        {
            title:
                "50/30/20 Rule",

            description:
                "Divide your income into needs, wants and savings automatically.",

            link:
                "#rule"
        },

        {
            title:
                "Budget Calculator",

            description:
                "Enter your monthly income and get an instant 50/30/20 breakdown.",

            link:
                "#rule"
        },

        {
            title:
                "Savings Goals",

            description:
                "Set and track your financial goals with a progress bar.",

            link:
                "#savings"
        },

        {
            title:
                "Estimated Time to Goal",

            description:
                "Find out how many months it will take to reach your savings target.",

            link:
                "#savings"
        },

        {
            title:
                "Expense Planner",

            description:
                "Track and manage your spending across everyday categories.",

            link:
                "#expenses"
        },

        {
            title:
                "Remaining Balance",

            description:
                "See what's left of your budget after logging your expenses.",

            link:
                "#expenses"
        },

        {
            title:
                "Money Mistakes",

            description:
                "Learn common student money mistakes and how to avoid them.",

            link:
                "#mistakes"
        },

        {
            title:
                "Impulse Buying",

            description:
                "Why waiting 24 hours before a purchase can save you money.",

            link:
                "#mistakes"
        },

        {
            title:
                "Unused Subscriptions",

            description:
                "Review recurring subscriptions and cancel the ones you don't use.",

            link:
                "#mistakes"
        },

        {
            title:
                "No Budget Plan",

            description:
                "Why skipping a monthly plan makes it hard to track where money goes.",

            link:
                "#mistakes"
        },

        {
            title:
                "Money Infographics",

            description:
                "Visual explainers for Needs vs Wants, the 50-30-20 rule and the budget cycle.",

            link:
                "#infographics"
        },

        {
            title:
                "The Budget Cycle",

            description:
                "Plan, spend, track and review — the four steps of healthy budgeting.",

            link:
                "#infographics"
        },

        {
            title:
                "Saving Challenge",

            description:
                "Start small and build the habit of increasing your savings over time.",

            link:
                "#infographics"
        },

        {
            title:
                "BudgetBee Chatbot",

            description:
                "Ask quick questions about budgeting, saving and the 50/30/20 rule.",

            link:
                "#chatbot"
        }

    ];


    function renderLearningCards(items) {

        if (!searchResults)
            return;


        if (!items.length) {

            searchResults.innerHTML = `
                <div class="bb-search-empty">
                    <i class="bi bi-search"></i>
                    <span>No results found</span>
                </div>
            `;

            return;
        }


        searchResults.innerHTML =
            items.map(item => `

                <div class="col-md-6 col-lg-4">
                    <a
                        href="${item.link}"
                        class="bb-search-result"
                    >

                        <strong>
                            ${escapeHTML(item.title)}
                        </strong>

                        <small>
                            ${escapeHTML(item.description)}
                        </small>

                    </a>
                </div>

            `).join("");
    }


    function searchLearning(value) {

        const query =
            value.toLowerCase().trim();


        if (!query) {

            renderLearningCards(learningData);

            return;
        }


        const results =
            learningData.filter(item =>
                item.title
                    .toLowerCase()
                    .includes(query) ||

                item.description
                    .toLowerCase()
                    .includes(query)
            );


        renderLearningCards(results);
    }


    learningSearch?.addEventListener(
        "input",
        e => {

            searchLearning(
                e.target.value
            );

        }
    );


    renderLearningCards(learningData);


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backTop =
        $("#backTop");


    function backTopCheck() {

        if (!backTop)
            return;

        backTop.classList.toggle(
            "show",
            window.scrollY > 500
        );
    }


    window.addEventListener(
        "scroll",
        backTopCheck,
        { passive: true }
    );


    backTopCheck();


    backTop?.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =====================================================
       VISITOR COUNTER
    ===================================================== */

    const visitor =
        $("#visitorCount") ||
        $("#visitors");


    if (visitor) {

        let visits =
            Number(
                localStorage.getItem(
                    "budgetbasics-visits"
                )
            ) || 1284;


        if (
            !sessionStorage.getItem(
                "budgetbee-visited"
            )
        ) {

            visits++;

            localStorage.setItem(
                "budgetbasics-visits",
                visits
            );

            sessionStorage.setItem(
                "budgetbee-visited",
                "true"
            );
        }


        animateValue(
            visitor,
            visits,
            ""
        );
    }


    /* =====================================================
       CHATBOT
    ===================================================== */

    const chatInput =
        $("#chatInput");

    const chatSend =
        $("#sendChat");

    const chatMessages =
        $("#chatMessages");


    function botAnswer(message) {

        const text =
            message.toLowerCase();


        if (
            text.includes("hello") ||
            text.includes("hi") ||
            text.includes("hey")
        ) {

            return `
                Hey! 🐝 I'm BudgetBee.
                Ask me about budgeting, saving,
                expenses or the 50/30/20 rule.
            `;
        }


        if (
            text.includes("50/30/20") ||
            text.includes("50 30 20")
        ) {

            return `
                The 50/30/20 rule means:
                50% for needs,
                30% for wants,
                and 20% for savings.
            `;
        }


        if (text.includes("budget")) {

            return `
                A budget is a plan for your money.
                Track your income, expenses,
                needs, wants and savings.
            `;
        }


        if (
            text.includes("saving") ||
            text.includes("save")
        ) {

            return `
                Set a clear savings goal and
                save a fixed amount regularly.
                Small consistent savings can build
                strong financial habits.
            `;
        }


        if (
            text.includes("expense") ||
            text.includes("spending")
        ) {

            return `
                Track every expense and group it
                into categories such as food,
                transport, education and entertainment.
            `;
        }


        if (
            text.includes("need") &&
            text.includes("want")
        ) {

            return `
                A need is essential for daily life,
                while a want is something optional.
                Ask yourself whether you can live
                without the purchase.
            `;
        }


        if (text.includes("student")) {

            return `
                Students can start by tracking
                every expense, limiting unnecessary
                purchases and saving regularly.
            `;
        }


        if (
            text.includes("thank")
        ) {

            return `
                You're welcome! 🐝💜
            `;
        }


        return `
            🐝 I can help you with budgeting,
            saving, expenses, needs vs wants,
            the 50/30/20 rule and student finance.
        `;
    }


    function addChat(message, type) {

        if (!chatMessages)
            return;


        const bubble =
            document.createElement("div");


        bubble.className =
            `bb-chat-message ${type}`;


        bubble.innerHTML =
            escapeHTML(message);


        chatMessages.appendChild(
            bubble
        );


        chatMessages.scrollTo({
            top:
                chatMessages.scrollHeight,
            behavior:
                "smooth"
        });
    }


    function sendMessage() {

        const message =
            chatInput?.value.trim();


        if (!message)
            return;


        addChat(
            message,
            "user"
        );


        chatInput.value = "";


        setTimeout(
            () => {

                addChat(
                    botAnswer(message),
                    "bot"
                );

            },
            450
        );
    }


    chatSend?.addEventListener(
        "click",
        sendMessage
    );


    chatInput?.addEventListener(
        "keydown",
        e => {

            if (e.key === "Enter") {

                e.preventDefault();

                sendMessage();
            }
        }
    );


    $$(".quick-questions button[data-question]").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                if (chatInput)
                    chatInput.value =
                        button.dataset.question;

                sendMessage();
            }
        );

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        $$("section[id]");

    const navLinks =
        $$(
            '.navbar a[href^="#"]'
        );


    const navObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting)
                        return;


                    navLinks.forEach(link => {

                        link.classList.remove(
                            "active"
                        );


                        if (
                            link.getAttribute(
                                "href"
                            ) ===
                            `#${entry.target.id}`
                        ) {

                            link.classList.add(
                                "active"
                            );
                        }
                    });

                });

            },
            {
                threshold: 0.35
            }
        );


    sections.forEach(section =>
        navObserver.observe(section)
    );


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    const progress =
        document.createElement("div");

    progress.className =
        "bb-scroll-progress";

    document.body.appendChild(progress);


    function updateProgress() {

        const scrollTop =
            window.scrollY;

        const height =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            height > 0
                ? scrollTop / height * 100
                : 0;

        progress.style.width =
            `${percentage}%`;
    }


    window.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );


    updateProgress();


    /* =====================================================
       TOAST
    ===================================================== */

    window.showToast =
        function (message, type = "success") {

            const toast =
                $("#budgetToast");

            const messageBox =
                $("#toastMessage");


            if (messageBox)
                messageBox.textContent =
                    message;


            if (!toast)
                return;


            toast.classList.remove(
                "success",
                "warning",
                "danger",
                "info"
            );


            toast.classList.add(
                type
            );


            if (window.bootstrap) {

                const instance =
                    bootstrap.Toast
                        .getOrCreateInstance(
                            toast,
                            {
                                delay: 3000
                            }
                        );

                instance.show();

            } else {

                toast.classList.add(
                    "show"
                );

                setTimeout(
                    () => {
                        toast.classList.remove(
                            "show"
                        );
                    },
                    3000
                );
            }
        };


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        $("#contact form");


    contactForm?.addEventListener(
        "submit",
        e => {

            e.preventDefault();


            const required =
                $$(
                    "input[required], textarea[required], select[required]",
                    contactForm
                );


            let valid = true;


            required.forEach(input => {

                if (!input.value.trim()) {

                    valid = false;

                    input.classList.add(
                        "bb-input-error"
                    );

                } else {

                    input.classList.remove(
                        "bb-input-error"
                    );
                }
            });


            if (!valid) {

                showToast(
                    "Please fill all required fields.",
                    "warning"
                );

                return;
            }


            showToast(
                "Thanks! Your feedback has been received. 💜",
                "success"
            );


            contactForm.reset();
        }
    );


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    document.body.classList.add(
        "bb-ready"
    );

    console.log(
        "%c BUDGETBASICS ULTRA MODE ACTIVATED",
        "font-size:18px;font-weight:bold;"
    );

});