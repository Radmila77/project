import React from 'react';

const AboutVector = () => (
    <svg
        className="absolute inset-0 h-full w-full pointer-events-none"
        viewBox="0 0 1440 1800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <circle cx="1188" cy="198" r="250" fill="url(#aboutGlowOne)" />
        <circle cx="170" cy="1450" r="300" fill="url(#aboutGlowTwo)" />
        <circle cx="1124" cy="1090" r="230" fill="url(#aboutGlowThree)" />

        <ellipse cx="1094" cy="230" rx="210" ry="150" stroke="rgba(125,15,23,0.10)" strokeWidth="1.8" />
        <ellipse cx="1094" cy="230" rx="150" ry="108" stroke="rgba(125,15,23,0.14)" strokeWidth="1.8" strokeDasharray="8 10" />

        <path
            d="M124 292C274 228 430 204 578 234C725 263 842 345 988 372C1117 396 1245 369 1360 314"
            stroke="rgba(125,15,23,0.12)"
            strokeWidth="2.5"
            strokeLinecap="round"
        />
        <path
            d="M74 1014C224 944 394 921 553 953C708 984 832 1070 979 1097C1120 1123 1250 1098 1370 1036"
            stroke="rgba(125,15,23,0.09)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="8 10"
        />

        <path
            d="M1028 122C1061 147 1092 182 1111 224C1138 287 1134 357 1170 416"
            stroke="rgba(125,15,23,0.18)"
            strokeWidth="3"
            strokeLinecap="round"
        />
        <path
            d="M178 1340C250 1318 314 1285 370 1232C419 1185 458 1128 523 1090"
            stroke="rgba(125,15,23,0.14)"
            strokeWidth="3"
            strokeLinecap="round"
        />

        <circle cx="1112" cy="226" r="10" fill="#7D0F17" fillOpacity="0.78" />
        <circle cx="1170" cy="416" r="10" fill="#7D0F17" fillOpacity="0.72" />
        <circle cx="370" cy="1232" r="10" fill="#7D0F17" fillOpacity="0.72" />

        <rect x="958" y="130" width="260" height="260" rx="48" fill="rgba(255,255,255,0.42)" />
        <rect x="996" y="168" width="184" height="184" rx="40" stroke="rgba(125,15,23,0.10)" strokeWidth="1.5" />
        <path d="M1026 302C1078 248 1120 230 1180 214" stroke="rgba(125,15,23,0.18)" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M1036 324C1090 282 1134 266 1188 258" stroke="rgba(125,15,23,0.10)" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="8 10" />

        <defs>
            <radialGradient id="aboutGlowOne" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1168 168) rotate(90) scale(220)">
                <stop stopColor="#8B1822" stopOpacity="0.16" />
                <stop offset="1" stopColor="#8B1822" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="aboutGlowTwo" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(196 1480) rotate(90) scale(280)">
                <stop stopColor="#220B0E" stopOpacity="0.10" />
                <stop offset="1" stopColor="#220B0E" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="aboutGlowThree" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1098 1120) rotate(90) scale(220)">
                <stop stopColor="#7D0F17" stopOpacity="0.12" />
                <stop offset="1" stopColor="#7D0F17" stopOpacity="0" />
            </radialGradient>
        </defs>
    </svg>
);

export default AboutVector;
