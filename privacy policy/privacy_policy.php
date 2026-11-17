<?php
/**
 * Privacy Policy for Arrow Puzzle
 * Package ID: com.wisaxis.arrowpuzzle
 */

declare(strict_types=1);

// Configuration Settings
$appName        = "Arrow Puzzle";
$packageName    = "com.wisaxis.arrowpuzzle";
$developerName  = "Wisaxis";
$contactEmail   = "support@arrowpuzzle.com";
$effectiveDate  = "November 13, 2026";
$currentYear    = date("Y");

// Set HTTP headers for security and clean rendering
header("Content-Type: text/html; charset=UTF-8");
header("X-Content-Type-Options: nosniff");
header("X-Frame-Options: SAMEORIGIN");
header("Referrer-Policy: strict-origin-when-cross-origin");
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Privacy Policy for <?= htmlspecialchars($appName) ?> (<?= htmlspecialchars($packageName) ?>).">
  <meta name="robots" content="index, follow">
  <title>Privacy Policy &mdash; <?= htmlspecialchars($appName) ?></title>
  
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: #ffffff;
      color: #1a1a1a;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 1rem;
      line-height: 1.6;
      max-width: 800px;
      margin: 40px auto;
      padding: 0 20px 60px 20px;
      overflow-wrap: break-word;
      -webkit-font-smoothing: antialiased;
    }

    h1 {
      font-size: 2rem;
      font-weight: 700;
      color: #111111;
      margin-bottom: 1rem;
      line-height: 1.25;
    }

    h2 {
      font-size: 1.3rem;
      font-weight: 700;
      color: #111111;
      margin-top: 2.25rem;
      margin-bottom: 0.75rem;
      padding-bottom: 0.35rem;
      border-bottom: 1px solid #e5e5e5;
    }

    h3 {
      font-size: 1.05rem;
      font-weight: 600;
      color: #222222;
      margin-top: 1.25rem;
      margin-bottom: 0.5rem;
    }

    p {
      margin-bottom: 1rem;
    }

    .meta-info {
      color: #444444;
      font-size: 0.95rem;
      margin-bottom: 1.5rem;
      line-height: 1.7;
    }

    .meta-info strong {
      color: #111111;
    }

    hr {
      border: none;
      border-top: 1px solid #e5e5e5;
      margin: 1.5rem 0 2rem 0;
    }

    .summary-box {
      background: #f9f9f9;
      border: 1px solid #e5e5e5;
      padding: 1rem 1.25rem;
      margin-bottom: 2rem;
      font-size: 0.95rem;
    }

    .summary-box strong {
      color: #111111;
    }

    .toc {
      margin-bottom: 2rem;
      padding-left: 20px;
    }

    .toc li {
      margin-bottom: 0.35rem;
    }

    ul, ol {
      padding-left: 24px;
      margin-bottom: 1rem;
    }

    li {
      margin-bottom: 0.4rem;
    }

    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 0.9em;
      background: #f3f3f3;
      padding: 0.15rem 0.35rem;
      border-radius: 3px;
    }

    a {
      color: #0969da;
      text-decoration: underline;
    }

    a:hover {
      color: #0550ae;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.25rem 0;
      font-size: 0.92rem;
    }

    th, td {
      border: 1px solid #dddddd;
      padding: 9px 12px;
      text-align: left;
      vertical-align: top;
    }

    th {
      background-color: #f6f8fa;
      font-weight: 600;
      color: #111111;
    }

    .table-wrapper {
      overflow-x: auto;
      margin-bottom: 1rem;
    }

    footer {
      margin-top: 3rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e5e5e5;
      font-size: 0.9rem;
      color: #666666;
    }

    @media print {
      body {
        margin: 0;
        padding: 0;
        max-width: 100%;
      }
      a {
        text-decoration: none;
        color: #000000;
      }
    }
  </style>
</head>
<body>

  <h1>Privacy Policy</h1>

  <div class="meta-info">
    <strong>Application:</strong> <?= htmlspecialchars($appName) ?><br>
    <strong>Package Identifier:</strong> <code><?= htmlspecialchars($packageName) ?></code><br>
    <strong>Developer / Publisher:</strong> <?= htmlspecialchars($developerName) ?><br>
    <strong>Effective Date:</strong> <?= htmlspecialchars($effectiveDate) ?>
  </div>

  <hr>

  <div class="summary-box">
    <strong>Summary:</strong> <?= htmlspecialchars($appName) ?> does not collect personal identifiers such as your real name, email, phone number, contacts, or GPS location. No account or registration is required. All level progress and hints are stored directly on your device. Family-safe advertisements are provided by Google AdMob in compliance with Google Play Policies.
  </div>

  <h3>Table of Contents</h3>
  <ol class="toc">
    <li><a href="#section-1">Introduction &amp; Scope</a></li>
    <li><a href="#section-2">Information We Do NOT Collect</a></li>
    <li><a href="#section-3">Information We Collect &amp; How We Use It</a></li>
    <li><a href="#section-4">Google AdMob &amp; Third-Party SDK Disclosures</a></li>
    <li><a href="#section-5">Google Play Data Safety Disclosures</a></li>
    <li><a href="#section-6">Children's Privacy (COPPA &amp; GDPR-K Compliance)</a></li>
    <li><a href="#section-7">Data Retention &amp; Data Deletion Rights</a></li>
    <li><a href="#section-8">European Union &amp; UK Privacy Rights (GDPR)</a></li>
    <li><a href="#section-9">California Consumer Privacy Rights (CCPA / CPRA)</a></li>
    <li><a href="#section-10">Changes to This Privacy Policy</a></li>
    <li><a href="#section-11">Contact Us &amp; Data Requests</a></li>
  </ol>

  <!-- Section 1 -->
  <h2 id="section-1">1. Introduction &amp; Scope</h2>
  <p>
    This Privacy Policy explains how information is handled when you download, install, and play <strong><?= htmlspecialchars($appName) ?></strong> on Android devices. The Game is published by <strong><?= htmlspecialchars($developerName) ?></strong> ("we", "our", or "us").
  </p>
  <p>
    By installing or playing <?= htmlspecialchars($appName) ?>, you agree to the data handling practices described in this policy. If you do not agree with any part of this policy, please do not install or use the Game.
  </p>

  <!-- Section 2 -->
  <h2 id="section-2">2. Information We Do NOT Collect</h2>
  <p>
    The Game is designed to function with minimal permissions and does not collect or solicit any of the following:
  </p>
  <ul>
    <li><strong>No Personal Identifiers:</strong> We do not ask for or store your name, email address, home address, or telephone number.</li>
    <li><strong>No Account Registration:</strong> No account signup, password, or third-party login (such as Facebook or Google Sign-In) is required.</li>
    <li><strong>No Precise Location Data:</strong> We do not access or record your device's GPS or precise location.</li>
    <li><strong>No Device Sensors or Media Access:</strong> We do not access your camera, microphone, photo gallery, media storage, or contacts.</li>
    <li><strong>No Biometric Data:</strong> No fingerprint, facial recognition, or voice data is requested or stored.</li>
    <li><strong>No Financial Data:</strong> We do not collect or store your payment details or credit card information. All transactions are handled directly through Google Play Billing.</li>
  </ul>

  <!-- Section 3 -->
  <h2 id="section-3">3. Information We Collect &amp; How We Use It</h2>
  
  <h3>A. Local Device Save Data</h3>
  <p>
    Your game progress (completed levels, star ratings, unlocked chapters, hint balances, and sound preferences) is saved <strong>exclusively on your local device</strong>.
  </p>
  <ul>
    <li>Save data stays within Android's private app sandbox and is never uploaded to remote servers operated by us.</li>
    <li>Save files include an HMAC integrity check to safeguard your progress from corruption.</li>
  </ul>

  <h3>B. Anonymous Technical Diagnostics &amp; Crash Telemetry</h3>
  <p>
    Non-personally identifiable diagnostic information may be gathered automatically through Google Play Services when the application runs:
  </p>
  <ul>
    <li>Device model, manufacturer, and screen resolution.</li>
    <li>Android OS version.</li>
    <li>Crash logs, ANR (Application Not Responding) incident reports, and general performance telemetry.</li>
  </ul>
  <p>
    This information is used strictly to diagnose crashes, fix bugs, and ensure proper performance on various Android devices.
  </p>

  <!-- Section 4 -->
  <h2 id="section-4">4. Google AdMob &amp; Third-Party SDK Disclosures</h2>
  <p>
    <?= htmlspecialchars($appName) ?> is supported by advertisements through <strong>Google AdMob</strong>. AdMob may serve banner ads, app open ads, and optional rewarded video ads (such as watching an ad to receive a hint).
  </p>

  <h3>Google AdMob (Google LLC)</h3>
  <p>
    Google AdMob may process device-level identifiers to serve, measure, and protect advertisements:
  </p>
  <ul>
    <li><strong>Google Advertising ID (GAID / AAID):</strong> Used for frequency capping, ad measurement, and fraud prevention.</li>
    <li><strong>Approximate Geolocation:</strong> Used to display ads relevant to your general country or language region (derived from IP address, non-precise).</li>
    <li><strong>Ad Interaction Data:</strong> Ad views, clicks, and video completion rates.</li>
  </ul>
  <p>
    <strong>EEA &amp; UK Consent:</strong> For players in the European Economic Area (EEA) and the UK, we use the Google User Messaging Platform (UMP) to present a consent dialog for personalized or non-personalized ads in accordance with applicable laws.
  </p>
  <p>
    For more details on how Google handles data, please see:
  </p>
  <ul>
    <li><a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener">How Google uses information from sites or apps that use our services</a></li>
    <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google Privacy Policy</a></li>
  </ul>

  <h3>Google Play In-App Billing (Google LLC)</h3>
  <p>
    Optional in-game purchases (such as "<?= htmlspecialchars($appName) ?> Pro" ad removal or hint packs) are processed directly by the official Google Play In-App Billing API. We never receive or store your payment details. Transactions are governed by the <a href="https://play.google.com/intl/en_us/about/play-terms/" target="_blank" rel="noopener">Google Play Terms of Service</a>.
  </p>

  <h3>Unity Engine (Unity Technologies)</h3>
  <p>
    The game is built using the Unity Engine. Unity may process basic anonymous device hardware telemetry (graphics API, device specifications) to support rendering. For more details, refer to the <a href="https://unity.com/legal/privacy-policy" target="_blank" rel="noopener">Unity Privacy Policy</a>.
  </p>

  <!-- Section 5 -->
  <h2 id="section-5">5. Google Play Data Safety Disclosures</h2>
  <p>
    In compliance with Google Play's Data Safety requirements, the table below summarizes our data handling practices:
  </p>

  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Data Category</th>
          <th>Collected?</th>
          <th>Shared with 3rd Parties?</th>
          <th>Purpose</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Personal Identifiers</strong> (Name, Email, Phone)</td>
          <td>No</td>
          <td>No</td>
          <td>Not Collected</td>
        </tr>
        <tr>
          <td><strong>Financial Information</strong> (Card or Bank details)</td>
          <td>No</td>
          <td>No</td>
          <td>Handled directly by Google Play</td>
        </tr>
        <tr>
          <td><strong>Precise Location</strong> (GPS)</td>
          <td>No</td>
          <td>No</td>
          <td>Not Collected</td>
        </tr>
        <tr>
          <td><strong>Device Identifiers</strong> (Advertising ID / GAID)</td>
          <td>Yes</td>
          <td>Yes (Google AdMob)</td>
          <td>Advertising, analytics &amp; fraud prevention</td>
        </tr>
        <tr>
          <td><strong>App Diagnostics</strong> (Crash logs, ANRs)</td>
          <td>Yes</td>
          <td>Yes (Google Play)</td>
          <td>Crash diagnosis &amp; bug fixing</td>
        </tr>
        <tr>
          <td><strong>Gameplay Actions</strong> (Level progress, stars, hints)</td>
          <td>Local Only</td>
          <td>No</td>
          <td>Saved on-device for game functionality</td>
        </tr>
      </tbody>
    </table>
  </div>

  <ul>
    <li><strong>Encryption in Transit:</strong> All data transmissions between your device and Google services use standard HTTPS / TLS encryption.</li>
    <li><strong>Data Deletion:</strong> You can erase all game data at any time via your device settings.</li>
  </ul>

  <!-- Section 6 -->
  <h2 id="section-6">6. Children's Privacy (COPPA &amp; GDPR-K Compliance)</h2>
  <p>
    <?= htmlspecialchars($appName) ?> is a casual, family-friendly puzzle game. We do not knowingly collect personal information from children under the age of 13 (or under 16 in the European Union).
  </p>
  <ul>
    <li>Advertisements served through Google AdMob comply with Google Play Families Policy guidelines and content filtering standards.</li>
    <li>If a parent or guardian believes their child has submitted personal information to us, please contact us at <a href="mailto:<?= htmlspecialchars($contactEmail) ?>"><?= htmlspecialchars($contactEmail) ?></a> and we will delete it promptly.</li>
  </ul>

  <!-- Section 7 -->
  <h2 id="section-7">7. Data Retention &amp; Data Deletion Rights</h2>
  <p>
    Since we do not operate a cloud account database, your personal data is not stored on our servers. You have direct control over your data:
  </p>

  <h3>How to Erase Your In-Game Data:</h3>
  <ol>
    <li>Open your device's <strong>Settings</strong>.</li>
    <li>Go to <strong>Apps</strong> (or <em>Application Manager</em>).</li>
    <li>Select <strong><?= htmlspecialchars($appName) ?></strong>.</li>
    <li>Tap <strong>Storage &amp; cache</strong> &rarr; <strong>Clear Storage</strong> (or <em>Clear Data</em>).</li>
  </ol>
  <p>This permanently deletes your saved puzzle progress, hint balances, and local settings.</p>

  <h3>How to Reset or Delete Your Advertising ID:</h3>
  <ol>
    <li>Open Android <strong>Settings</strong> &rarr; <strong>Google</strong> &rarr; <strong>All Services</strong>.</li>
    <li>Select <strong>Ads</strong> (or <em>Ad privacy</em>).</li>
    <li>Tap <strong>Reset advertising ID</strong> or <strong>Delete advertising ID</strong>.</li>
  </ol>

  <!-- Section 8 -->
  <h2 id="section-8">8. European Union &amp; UK Privacy Rights (GDPR)</h2>
  <p>
    Under the General Data Protection Regulation (GDPR) and UK Data Protection Act 2018, users in the EEA and UK have the right to:
  </p>
  <ul>
    <li>Request access to or a copy of any personal data processed.</li>
    <li>Request erasure of personal data ("Right to be Forgotten").</li>
    <li>Withdraw advertising consent at any time via in-game settings or device ad settings.</li>
    <li>Lodge a complaint with your local Data Protection Authority.</li>
  </ul>

  <!-- Section 9 -->
  <h2 id="section-9">9. California Consumer Privacy Rights (CCPA / CPRA)</h2>
  <p>
    Under the California Consumer Privacy Act (CCPA) and CPRA, California residents have the right to:
  </p>
  <ul>
    <li><strong>No Sale of Data:</strong> We do not sell, rent, or trade your personal information.</li>
    <li><strong>Right to Know &amp; Delete:</strong> You may request disclosure of any collected data and request its deletion.</li>
    <li><strong>Non-Discrimination:</strong> We will not discriminate against you for exercising your privacy rights.</li>
  </ul>

  <!-- Section 10 -->
  <h2 id="section-10">10. Changes to This Privacy Policy</h2>
  <p>
    We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Effective Date". We encourage you to review this page periodically.
  </p>

  <!-- Section 11 -->
  <h2 id="section-11">11. Contact Us &amp; Data Requests</h2>
  <p>
    If you have any questions or data deletion requests regarding this Privacy Policy, please contact:
  </p>
  <p>
    <strong>Developer / Publisher:</strong> <?= htmlspecialchars($developerName) ?><br>
    <strong>Application:</strong> <?= htmlspecialchars($appName) ?><br>
    <strong>Package Identifier:</strong> <code><?= htmlspecialchars($packageName) ?></code><br>
    <strong>Email:</strong> <a href="mailto:<?= htmlspecialchars($contactEmail) ?>"><?= htmlspecialchars($contactEmail) ?></a>
  </p>

  <footer>
    <p>&copy; <?= htmlspecialchars($currentYear) ?> <?= htmlspecialchars($developerName) ?>. All rights reserved. &bull; Package ID: <?= htmlspecialchars($packageName) ?></p>
  </footer>

</body>
</html>
