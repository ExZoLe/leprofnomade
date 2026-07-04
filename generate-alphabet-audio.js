#!/usr/bin/env node

/**
 * LeProfNomade — Générateur audio alphabet
 * 
 * Usage:
 *   1. Place ce fichier à la racine de ton projet
 *   2. Lance: node generate-alphabet-audio.js
 *   3. Les fichiers MP3 seront dans public/audio/alphabet/
 *   4. git add -A && git commit -m "audio alphabet" && git push
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = 'sk_6ded064a800c68828523d61dff054e6edccee77b7911288c';

// ElevenLabs multilingual v2 voice (good for all languages)
const VOICE_ID = 'pFZP5JQG7iQjIQuC4Bku'; // Lily - multilingual

const OUTPUT_DIR = path.join(__dirname, 'public', 'audio', 'alphabet');

// ===== ALL CHARACTERS TO GENERATE =====
const chars = [
  // === CORÉEN — Consonnes ===
  { id: 'kr-giyeok',  text: '기역', lang: 'ko' },
  { id: 'kr-nieun',   text: '니은', lang: 'ko' },
  { id: 'kr-digeut',  text: '디귿', lang: 'ko' },
  { id: 'kr-rieul',   text: '리을', lang: 'ko' },
  { id: 'kr-mieum',   text: '미음', lang: 'ko' },
  { id: 'kr-bieup',   text: '비읍', lang: 'ko' },
  { id: 'kr-siot',    text: '시옷', lang: 'ko' },
  { id: 'kr-ieung',   text: '이응', lang: 'ko' },
  { id: 'kr-jieut',   text: '지읒', lang: 'ko' },
  { id: 'kr-chieut',  text: '치읓', lang: 'ko' },
  { id: 'kr-kieuk',   text: '키읔', lang: 'ko' },
  { id: 'kr-tieut',   text: '티읕', lang: 'ko' },
  { id: 'kr-pieup2',  text: '피읖', lang: 'ko' },
  { id: 'kr-hieut',   text: '히읗', lang: 'ko' },
  // === CORÉEN — Voyelles ===
  { id: 'kr-a',   text: '아', lang: 'ko' },
  { id: 'kr-ya',  text: '야', lang: 'ko' },
  { id: 'kr-eo',  text: '어', lang: 'ko' },
  { id: 'kr-yeo', text: '여', lang: 'ko' },
  { id: 'kr-o',   text: '오', lang: 'ko' },
  { id: 'kr-yo',  text: '요', lang: 'ko' },
  { id: 'kr-u',   text: '우', lang: 'ko' },
  { id: 'kr-yu',  text: '유', lang: 'ko' },
  { id: 'kr-eu',  text: '으', lang: 'ko' },
  { id: 'kr-i',   text: '이', lang: 'ko' },
  // === CORÉEN — Syllabes ===
  { id: 'kr-ga',   text: '가', lang: 'ko' },
  { id: 'kr-han',  text: '한', lang: 'ko' },
  { id: 'kr-geul', text: '글', lang: 'ko' },
  { id: 'kr-seo',  text: '서', lang: 'ko' },
  { id: 'kr-ul',   text: '울', lang: 'ko' },
  { id: 'kr-bap',  text: '밥', lang: 'ko' },

  // === ITALIEN — Lettres ===
  { id: 'it-a', text: 'a', lang: 'it' },
  { id: 'it-b', text: 'bi', lang: 'it' },
  { id: 'it-c', text: 'ci', lang: 'it' },
  { id: 'it-d', text: 'di', lang: 'it' },
  { id: 'it-e', text: 'e', lang: 'it' },
  { id: 'it-f', text: 'effe', lang: 'it' },
  { id: 'it-g', text: 'gi', lang: 'it' },
  { id: 'it-h', text: 'acca', lang: 'it' },
  { id: 'it-i', text: 'i', lang: 'it' },
  { id: 'it-l', text: 'elle', lang: 'it' },
  { id: 'it-m', text: 'emme', lang: 'it' },
  { id: 'it-n', text: 'enne', lang: 'it' },
  { id: 'it-o', text: 'o', lang: 'it' },
  { id: 'it-p', text: 'pi', lang: 'it' },
  { id: 'it-q', text: 'cu', lang: 'it' },
  { id: 'it-r', text: 'erre', lang: 'it' },
  { id: 'it-s', text: 'esse', lang: 'it' },
  { id: 'it-t', text: 'ti', lang: 'it' },
  { id: 'it-u', text: 'u', lang: 'it' },
  { id: 'it-v', text: 'vu', lang: 'it' },
  { id: 'it-z', text: 'zeta', lang: 'it' },
  // === ITALIEN — Pièges ===
  { id: 'it-ce-ci',   text: 'ce, ci. Cena, cinema.', lang: 'it' },
  { id: 'it-ca-co',   text: 'ca, co. Casa, cosa.', lang: 'it' },
  { id: 'it-che',      text: 'che. Chiave.', lang: 'it' },
  { id: 'it-ge-gi',   text: 'ge, gi. Gelato, giro.', lang: 'it' },
  { id: 'it-ghe',      text: 'ghe. Spaghetti.', lang: 'it' },
  { id: 'it-gli',      text: 'gli. Famiglia, figlio.', lang: 'it' },
  { id: 'it-gn',       text: 'gn. Gnocchi, bagno.', lang: 'it' },
  { id: 'it-sce',      text: 'sce. Scena, uscire.', lang: 'it' },
  { id: 'it-sca',      text: 'sca. Scala, scuola.', lang: 'it' },

  // === ANGLAIS — Lettres ===
  { id: 'en-a', text: 'A', lang: 'en' },
  { id: 'en-b', text: 'B', lang: 'en' },
  { id: 'en-c', text: 'C', lang: 'en' },
  { id: 'en-d', text: 'D', lang: 'en' },
  { id: 'en-e', text: 'E', lang: 'en' },
  { id: 'en-f', text: 'F', lang: 'en' },
  { id: 'en-g', text: 'G', lang: 'en' },
  { id: 'en-h', text: 'H', lang: 'en' },
  { id: 'en-i', text: 'I', lang: 'en' },
  { id: 'en-j', text: 'J', lang: 'en' },
  { id: 'en-k', text: 'K', lang: 'en' },
  { id: 'en-l', text: 'L', lang: 'en' },
  { id: 'en-m', text: 'M', lang: 'en' },
  { id: 'en-n', text: 'N', lang: 'en' },
  { id: 'en-o', text: 'O', lang: 'en' },
  { id: 'en-p', text: 'P', lang: 'en' },
  { id: 'en-q', text: 'Q', lang: 'en' },
  { id: 'en-r', text: 'R', lang: 'en' },
  { id: 'en-s', text: 'S', lang: 'en' },
  { id: 'en-t', text: 'T', lang: 'en' },
  { id: 'en-u', text: 'U', lang: 'en' },
  { id: 'en-v', text: 'V', lang: 'en' },
  { id: 'en-w', text: 'W', lang: 'en' },
  { id: 'en-x', text: 'X', lang: 'en' },
  { id: 'en-y', text: 'Y', lang: 'en' },
  { id: 'en-z', text: 'Z', lang: 'en' },
  // === ANGLAIS — Sons difficiles ===
  { id: 'en-th',    text: 'the, think, three', lang: 'en' },
  { id: 'en-h-asp', text: 'hello, house, happy', lang: 'en' },
  { id: 'en-w-snd', text: 'water, what, well', lang: 'en' },
  { id: 'en-r-snd', text: 'red, right, around', lang: 'en' },
  { id: 'en-ing',   text: 'going, eating, learning', lang: 'en' },
  { id: 'en-schwa', text: 'about, banana, the', lang: 'en' },
];

// ===== GENERATE FUNCTION =====
function generateAudio(charData) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(OUTPUT_DIR, `${charData.id}.mp3`);
    
    // Skip if already exists
    if (fs.existsSync(filePath)) {
      console.log(`  ⏭  ${charData.id} (already exists)`);
      return resolve();
    }

    const body = JSON.stringify({
      text: charData.text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability: 0.75,
        similarity_boost: 0.75,
        style: 0.0,
        use_speaker_boost: true,
      },
    });

    const options = {
      hostname: 'api.elevenlabs.io',
      path: `/v1/text-to-speech/${VOICE_ID}`,
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': API_KEY,
      },
    };

    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          console.error(`  ❌ ${charData.id} — HTTP ${res.statusCode}: ${data.substring(0, 200)}`);
          resolve(); // Don't reject, continue with next
        });
        return;
      }

      const fileStream = fs.createWriteStream(filePath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        console.log(`  ✅ ${charData.id} → ${charData.text}`);
        resolve();
      });
      fileStream.on('error', reject);
    });

    req.on('error', (err) => {
      console.error(`  ❌ ${charData.id} — ${err.message}`);
      resolve();
    });

    req.write(body);
    req.end();
  });
}

// ===== MAIN =====
async function main() {
  console.log('🎙  LeProfNomade — Génération audio alphabet');
  console.log(`   ${chars.length} fichiers à générer\n`);

  // Create output directory
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let count = 0;
  for (const c of chars) {
    await generateAudio(c);
    count++;
    
    // Rate limiting — wait 500ms between requests
    if (count < chars.length) {
      await new Promise(r => setTimeout(r, 500));
    }
  }

  console.log(`\n🎉 Terminé ! ${count} fichiers dans ${OUTPUT_DIR}`);
  console.log('   → git add -A && git commit -m "audio alphabet ElevenLabs" && git push');
}

main().catch(console.error);
