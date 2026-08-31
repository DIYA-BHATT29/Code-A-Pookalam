/* =========================================================
   VIRTUAL ATHAPOOKALAM
   Entire design generated using HTML Canvas
========================================================= */


const canvas =
    document.getElementById(
        "pookalamCanvas"
    );

const ctx =
    canvas.getContext("2d");


let W = 900;

let H = 900;

let CX = 450;

let CY = 450;

let time = 0;

let currentEffect = "bloom";

let lampsOn = true;



/* =========================================================
   CANVAS SETUP
========================================================= */

function resizeCanvas() {

    const size =
        Math.min(
            window.innerWidth * 0.94,
            850
        );

    const ratio =
        window.devicePixelRatio || 1;


    canvas.width =
        size * ratio;

    canvas.height =
        size * ratio;


    canvas.style.width =
        size + "px";

    canvas.style.height =
        size + "px";


    ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );


    W = size;

    H = size;

    CX = W / 2;

    CY = H / 2;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);



/* =========================================================
   COLORS
========================================================= */

const COLORS = {

    green:
        "#17482e",

    darkGreen:
        "#0d321f",

    pink:
        "#c9145e",

    brightPink:
        "#e82c75",

    lightPink:
        "#f37eac",

    orange:
        "#ef7415",

    yellow:
        "#f5bd18",

    gold:
        "#ffc928",

    cream:
        "#fff1cc",

    white:
        "#fff7df",

    red:
        "#a7193d"

};



/* =========================================================
   BASIC FUNCTIONS
========================================================= */

function circle(
    x,
    y,
    radius,
    color
) {

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        radius,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        color;

    ctx.fill();

}



function polar(
    radius,
    angle
) {

    return {

        x:
            CX +
            Math.cos(angle) *
            radius,

        y:
            CY +
            Math.sin(angle) *
            radius

    };

}



/* =========================================================
   FLOWER PETAL
========================================================= */

function drawPetal(
    x,
    y,
    size,
    color,
    angle,
    alpha = 1
) {

    ctx.save();


    ctx.translate(
        x,
        y
    );


    ctx.rotate(
        angle
    );


    ctx.globalAlpha =
        alpha;


    ctx.beginPath();


    ctx.ellipse(

        0,

        -size * 0.48,

        size * 0.28,

        size * 0.55,

        0,

        0,

        Math.PI * 2

    );


    ctx.fillStyle =
        color;


    ctx.fill();


    ctx.globalAlpha =
        1;


    ctx.restore();

}



/* =========================================================
   SMALL FLOWER
========================================================= */

function drawFlower(
    x,
    y,
    size,
    color,
    petalCount = 6,
    rotation = 0
) {

    for (
        let i = 0;
        i < petalCount;
        i++
    ) {

        const angle =
            rotation +
            i *
            Math.PI * 2 /
            petalCount;


        drawPetal(

            x,

            y,

            size,

            color,

            angle

        );

    }


    circle(

        x,

        y,

        size * .18,

        COLORS.yellow

    );

}



/* =========================================================
   FLOWER RING
========================================================= */

function flowerRing(
    radius,
    count,
    size,
    color,
    rotation = 0
) {

    for (
        let i = 0;
        i < count;
        i++
    ) {

        const angle =
            rotation +
            i *
            Math.PI * 2 /
            count;


        const p =
            polar(
                radius,
                angle
            );


        let pulse = 1;


        if (
            currentEffect ===
            "bloom"
        ) {

            pulse =
                1 +
                Math.sin(
                    time * 2 +
                    i * .35
                ) *
                .035;

        }


        drawFlower(

            p.x,

            p.y,

            size * pulse,

            color,

            6,

            angle

        );

    }

}



/* =========================================================
   PETAL DOT RING
========================================================= */

function petalDotRing(
    radius,
    count,
    size,
    color,
    rotation = 0
) {

    for (
        let i = 0;
        i < count;
        i++
    ) {

        const angle =
            rotation +
            i *
            Math.PI * 2 /
            count;


        const p =
            polar(
                radius,
                angle
            );


        circle(

            p.x,

            p.y,

            size,

            color

        );

    }

}



/* =========================================================
   RING
========================================================= */

function drawRing(
    radius,
    width,
    color
) {

    ctx.beginPath();

    ctx.arc(

        CX,

        CY,

        radius,

        0,

        Math.PI * 2

    );

    ctx.strokeStyle =
        color;

    ctx.lineWidth =
        width;

    ctx.stroke();

}



/* =========================================================
   GEOMETRIC TRIANGLES
========================================================= */

function triangularRing() {

    const outer =
        365;

    const inner =
        305;


    for (
        let i = 0;
        i < 12;
        i++
    ) {

        const a =
            i *
            Math.PI * 2 /
            12;


        const p1 =
            polar(
                inner,
                a - .22
            );


        const p2 =
            polar(
                outer,
                a
            );


        const p3 =
            polar(
                inner,
                a + .22
            );


        ctx.beginPath();

        ctx.moveTo(
            p1.x,
            p1.y
        );

        ctx.lineTo(
            p2.x,
            p2.y
        );

        ctx.lineTo(
            p3.x,
            p3.y
        );

        ctx.closePath();


        ctx.fillStyle =
            i % 2 === 0
                ? COLORS.yellow
                : COLORS.cream;

        ctx.fill();

    }

}



/* =========================================================
   OUTER LEAF RING
========================================================= */

function outerLeaves() {

    const radius =
        382;

    const count =
        100;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const angle =
            i *
            Math.PI * 2 /
            count;


        const p =
            polar(
                radius,
                angle
            );


        ctx.save();


        ctx.translate(
            p.x,
            p.y
        );


        ctx.rotate(
            angle
        );


        ctx.fillStyle =
            i % 2
                ? COLORS.green
                : COLORS.darkGreen;


        ctx.beginPath();


        ctx.ellipse(

            0,

            -6,

            4,

            10,

            0,

            0,

            Math.PI * 2

        );


        ctx.fill();


        ctx.restore();

    }

}



/* =========================================================
   DECORATIVE CURVES
========================================================= */

function decorativeCurves() {

    const radius =
        240;


    for (
        let i = 0;
        i < 12;
        i++
    ) {

        const base =
            i *
            Math.PI * 2 /
            12;


        ctx.save();


        ctx.translate(
            CX,
            CY
        );


        ctx.rotate(
            base
        );


        ctx.strokeStyle =
            COLORS.yellow;

        ctx.lineWidth =
            8;

        ctx.lineCap =
            "round";


        ctx.beginPath();


        ctx.moveTo(
            -85,
            -radius
        );


        ctx.bezierCurveTo(

            -55,
            -radius - 30,

            -15,
            -radius + 30,

            0,
            -radius

        );


        ctx.bezierCurveTo(

            15,
            -radius - 30,

            55,
            -radius - 30,

            85,
            -radius

        );


        ctx.stroke();


        /* Spiral */

        ctx.beginPath();


        ctx.arc(

            0,

            -radius,

            19,

            0,

            Math.PI * 1.7

        );


        ctx.stroke();


        ctx.restore();

    }

}



/* =========================================================
   SMALL PINK FLOWERS AROUND CURVES
========================================================= */

function decorativeFlowers() {

    const radius =
        247;


    for (
        let i = 0;
        i < 24;
        i++
    ) {

        const angle =
            i *
            Math.PI * 2 /
            24;


        const p =
            polar(
                radius,
                angle
            );


        drawFlower(

            p.x,

            p.y,

            13,

            COLORS.brightPink,

            5,

            angle

        );

    }

}



/* =========================================================
   CENTRAL LOTUS
========================================================= */

function lotusPetal(
    angle,
    length,
    width,
    color,
    offset = 0
) {

    ctx.save();


    ctx.translate(
        CX,
        CY - 25
    );


    ctx.rotate(
        angle
    );


    ctx.beginPath();


    ctx.moveTo(
        0,
        0
    );


    ctx.bezierCurveTo(

        -width,
        -length * .28,

        -width,
        -length * .75,

        0,
        -length

    );


    ctx.bezierCurveTo(

        width,
        -length * .75,

        width,
        -length * .28,

        0,
        0

    );


    ctx.closePath();


    ctx.fillStyle =
        color;

    ctx.fill();


    ctx.strokeStyle =
        "rgba(255,220,235,.45)";

    ctx.lineWidth =
        2;

    ctx.stroke();


    ctx.restore();

}



/* =========================================================
   LOTUS
========================================================= */

function drawLotus() {

    let scale =
        1;


    if (
        currentEffect ===
        "bloom"
    ) {

        scale =
            1 +
            Math.sin(
                time * 2
            ) *
            .025;

    }


    ctx.save();


    ctx.translate(
        CX,
        CY
    );


    ctx.scale(
        scale,
        scale
    );


    ctx.translate(
        -CX,
        -CY
    );



    /* Back petals */

    const backPetals =
        12;


    for (
        let i = 0;
        i < backPetals;
        i++
    ) {

        const angle =
            i *
            Math.PI * 2 /
            backPetals;


        lotusPetal(

            angle,

            190,

            43,

            COLORS.pink

        );

    }



    /* Middle petals */

    const middlePetals =
        10;


    for (
        let i = 0;
        i < middlePetals;
        i++
    ) {

        const angle =
            i *
            Math.PI * 2 /
            middlePetals +
            Math.PI / 10;


        lotusPetal(

            angle,

            160,

            45,

            COLORS.brightPink

        );

    }



    /* Front petals */

    const frontPetals =
        8;


    for (
        let i = 0;
        i < frontPetals;
        i++
    ) {

        const angle =
            i *
            Math.PI * 2 /
            frontPetals +
            Math.PI / 8;


        lotusPetal(

            angle,

            135,

            40,

            COLORS.lightPink

        );

    }



    /* Lotus center */

    circle(

        CX,

        CY - 20,

        32,

        COLORS.yellow

    );


    flowerRing(

        23,

        8,

        10,

        COLORS.gold

    );


    ctx.restore();

}



/* =========================================================
   LOTUS LEAVES
========================================================= */

function lotusLeaves() {

    for (
        let i = 0;
        i < 7;
        i++
    ) {

        const angle =
            Math.PI +
            i *
            Math.PI /
            6;


        const p =
            polar(
                105,
                angle
            );


        ctx.save();


        ctx.translate(
            p.x,
            p.y
        );


        ctx.rotate(
            angle
        );


        ctx.fillStyle =
            COLORS.green;


        ctx.beginPath();


        ctx.ellipse(

            0,

            0,

            28,

            60,

            0,

            0,

            Math.PI * 2

        );


        ctx.fill();


        ctx.restore();

    }

}



/* =========================================================
   BASE BACKGROUND
========================================================= */

function drawBackground() {

    const gradient =
        ctx.createRadialGradient(

            CX,
            CY,
            40,

            CX,
            CY,
            W * .48

        );


    gradient.addColorStop(
        0,
        "#fff2cf"
    );


    gradient.addColorStop(
        .2,
        "#fff0ca"
    );


    gradient.addColorStop(
        .21,
        "#17472e"
    );


    gradient.addColorStop(
        .27,
        "#d31d64"
    );


    gradient.addColorStop(
        .38,
        "#ef7816"
    );


    gradient.addColorStop(
        .48,
        "#fff0ca"
    );


    gradient.addColorStop(
        .53,
        "#17472e"
    );


    gradient.addColorStop(
        .59,
        "#d21b61"
    );


    gradient.addColorStop(
        .7,
        "#ef7816"
    );


    gradient.addColorStop(
        .76,
        "#d51c61"
    );


    gradient.addColorStop(
        1,
        "#17472e"
    );


    ctx.beginPath();

    ctx.arc(
        CX,
        CY,
        W * .44,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        gradient;

    ctx.fill();

}



/* =========================================================
   PETAL TEXTURE
========================================================= */

function petalTexture(
    radius,
    count,
    size,
    colors
) {

    for (
        let i = 0;
        i < count;
        i++
    ) {

        const angle =
            i *
            Math.PI * 2 /
            count;


        const variation =
            Math.sin(
                i * 7.31
            ) * 7;


        const p =
            polar(
                radius + variation,
                angle
            );


        const color =
            colors[
                i %
                colors.length
            ];


        drawPetal(

            p.x,

            p.y,

            size,

            color,

            angle

        );

    }

}



/* =========================================================
   MANY PETALS ON RINGS
========================================================= */

function buildFlowerPetals() {

    /* Outer pink ring */

    petalTexture(

        350,

        300,

        13,

        [
            COLORS.pink,
            COLORS.brightPink,
            "#bd1559"
        ]

    );


    /* Outer cream ring */

    petalTexture(

        320,

        190,

        11,

        [
            COLORS.cream,
            COLORS.white
        ]

    );


    /* Orange ring */

    petalTexture(

        285,

        190,

        10,

        [
            COLORS.orange,
            "#f58a20"
        ]

    );


    /* Green ring */

    petalTexture(

        258,

        150,

        9,

        [
            COLORS.green,
            "#205c38"
        ]

    );


    /* Inner cream */

    petalTexture(

        210,

        140,

        10,

        [
            COLORS.cream,
            COLORS.white
        ]

    );

}



/* =========================================================
   OUTER SMALL FLOWERS
========================================================= */

function outerFlowers() {

    flowerRing(

        315,

        24,

        16,

        COLORS.brightPink,

        time * .002

    );


    flowerRing(

        278,

        20,

        14,

        COLORS.yellow,

        -time * .002

    );


    flowerRing(

        235,

        18,

        12,

        COLORS.brightPink,

        time * .003

    );

}



/* =========================================================
   GOLDEN CENTER RINGS
========================================================= */

function centerRings() {

    drawRing(
        184,
        7,
        COLORS.orange
    );


    drawRing(
        201,
        5,
        COLORS.gold
    );


    drawRing(
        218,
        8,
        COLORS.orange
    );

}



/* =========================================================
   DRAW COMPLETE POOKALAM
========================================================= */

function drawPookalam() {

    ctx.clearRect(
        0,
        0,
        W,
        H
    );


    /* Dark circular shadow */

    circle(
        CX,
        CY,
        W * .455,
        "#0c0906"
    );


    /* Outer leaf border */

    outerLeaves();


    /* Main circular flower base */

    drawBackground();


    /* Geometric triangular decoration */

    triangularRing();


    /* Petal texture */

    buildFlowerPetals();


    /* Outer flowers */

    outerFlowers();


    /* Decorative golden vines */

    decorativeCurves();


    /* Decorative pink flowers */

    decorativeFlowers();


    /* Center rings */

    centerRings();


    /* Green lotus leaves */

    lotusLeaves();


    /* Main lotus */

    drawLotus();


    /* Sparkles */

    if (
        currentEffect ===
        "sparkle"
    ) {

        canvasSparkles();

    }


    /* Wave */

    if (
        currentEffect ===
        "wave"
    ) {

        waveOverlay();

    }

}



/* =========================================================
   WAVE EFFECT
========================================================= */

function waveOverlay() {

    ctx.save();


    ctx.strokeStyle =
        "rgba(255,220,120,.35)";


    ctx.lineWidth =
        3;


    for (
        let k = 0;
        k < 4;
        k++
    ) {

        ctx.beginPath();


        for (
            let i = 0;
            i <= 180;
            i++
        ) {

            const angle =
                i /
                180 *
                Math.PI * 2;


            const radius =
                200 +
                k * 35 +
                Math.sin(
                    angle * 7 +
                    time * 3
                ) *
                5;


            const p =
                polar(
                    radius,
                    angle
                );


            if (
                i === 0
            ) {

                ctx.moveTo(
                    p.x,
                    p.y
                );

            }

            else {

                ctx.lineTo(
                    p.x,
                    p.y
                );

            }

        }


        ctx.stroke();

    }


    ctx.restore();

}



/* =========================================================
   SPARKLES INSIDE POOKALAM
========================================================= */

function canvasSparkles() {

    for (
        let i = 0;
        i < 55;
        i++
    ) {

        const angle =
            i * 2.399 +
            time * .03;


        const radius =
            150 +
            (
                i * 37
            ) % 210;


        const p =
            polar(
                radius,
                angle
            );


        const size =
            2 +
            (
                i % 3
            );


        ctx.fillStyle =
            "rgba(255,226,130,.9)";


        ctx.fillRect(

            p.x - size / 2,

            p.y - size * 2,

            size,

            size * 4

        );


        ctx.fillRect(

            p.x - size * 2,

            p.y - size / 2,

            size * 4,

            size

        );

    }

}



/* =========================================================
   ANIMATION
========================================================= */

function animate() {

    time += .016;


    drawPookalam();


    requestAnimationFrame(
        animate
    );

}


animate();



/* =========================================================
   EFFECT BUTTONS
========================================================= */

const effectMessages = {

    bloom:
        "🌸 Every flower gently blooms with the rhythm of Onam.",

    rain:
        "🌼 A shower of flowers celebrates the beauty of Kerala.",

    lamp:
        "🪔 The warm glow of traditional lamps illuminates the Pookalam.",

    wave:
        "〰 The floral patterns flow in a gentle festive rhythm.",

    color:
        "🌀 The colours of the Pookalam come alive.",

    sparkle:
        "✦ Golden light sparkles across the floral design."

};



function setEffect(name) {

    currentEffect =
        name;


    document
        .querySelectorAll(
            ".effect-button"
        )
        .forEach(
            button => {

                button.classList.toggle(

                    "active",

                    button.dataset.effect ===
                    name

                );

            }
        );


    document.getElementById(
        "effectMessage"
    ).textContent =
        effectMessages[name];


    if (
        name === "rain"
    ) {

        flowerRain();

    }


    if (
        name === "sparkle"
    ) {

        sparkleBurst();

    }


    if (
        name === "lamp"
    ) {

        lampGlow();

    }

}



/* =========================================================
   FLOWER RAIN
========================================================= */

function flowerRain() {

    const flowers = [

        "🌸",
        "🌼",
        "🌺",
        "🌻",
        "🍃"

    ];


    for (
        let i = 0;
        i < 60;
        i++
    ) {

        const flower =
            document.createElement(
                "div"
            );


        flower.className =
            "rain-flower";


        flower.textContent =
            flowers[
                Math.floor(
                    Math.random() *
                    flowers.length
                )
            ];


        flower.style.left =
            Math.random() *
            100 +
            "vw";


        flower.style.fontSize =
            (
                12 +
                Math.random() * 20
            ) +
            "px";


        flower.style.setProperty(

            "--drift",

            (
                Math.random() *
                250 -
                125
            ) +
            "px"

        );


        flower.style.animationDuration =
            (
                4 +
                Math.random() * 5
            ) +
            "s";


        flower.style.animationDelay =
            (
                Math.random() * 2
            ) +
            "s";


        document
            .getElementById(
                "petalRain"
            )
            .appendChild(
                flower
            );


        setTimeout(
            () => {

                flower.remove();

            },
            11000
        );

    }

}



/* =========================================================
   SPARKLE BURST
========================================================= */

function sparkleBurst() {

    const container =
        document.getElementById(
            "sparkles"
        );


    for (
        let i = 0;
        i < 100;
        i++
    ) {

        const sparkle =
            document.createElement(
                "div"
            );


        sparkle.className =
            "sparkle";


        sparkle.style.left =
            Math.random() *
            100 +
            "vw";


        sparkle.style.top =
            Math.random() *
            100 +
            "vh";


        sparkle.style.animationDelay =
            Math.random() *
            1.5 +
            "s";


        container.appendChild(
            sparkle
        );


        setTimeout(
            () => {

                sparkle.remove();

            },
            3500
        );

    }

}



/* =========================================================
   LAMP EFFECT
========================================================= */

function lampGlow() {

    const diyas =
        document.querySelectorAll(
            ".diya"
        );


    diyas.forEach(
        diya => {

            diya.style.transform =
                "scale(1.4)";


            diya.style.filter =

                `
                drop-shadow(
                    0 0 12px #ffb000
                )
                drop-shadow(
                    0 0 35px #ffd45a
                )
                `;


            setTimeout(
                () => {

                    diya.style.transform =
                        "";

                    diya.style.filter =
                        "";

                },
                2500
            );

        }
    );

}



/* =========================================================
   LAMP ON / OFF
========================================================= */

function toggleLamps() {

    lampsOn =
        !lampsOn;


    const diyas =
        document.querySelectorAll(
            ".diya"
        );


    diyas.forEach(
        diya => {

            diya.style.opacity =
                lampsOn
                    ? "1"
                    : ".15";

        }
    );


    document.getElementById(
        "lampText"
    ).textContent =

        lampsOn
            ? "LIGHT LAMPS"
            : "LAMPS OFF";

}



/* =========================================================
   MUSIC
========================================================= */

function toggleMusic() {

    const music =
        document.getElementById(
            "onamMusic"
        );


    if (
        music.paused
    ) {

        music.play()
            .catch(
                () => {

                    alert(
                        "Add your royalty-free Onam music as static/onam.mp3"
                    );

                }
            );

    }

    else {

        music.pause();

    }

}



/* =========================================================
   DEFAULT EFFECT
========================================================= */

setEffect(
    "bloom"
);