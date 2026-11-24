import type { ProjectCaseStudy } from '../data/portfolio';

export default function ArchitectureDiagram({ id }: { id: ProjectCaseStudy['id'] }) {
  const stroke = 'currentColor';

  if (id === 'jaidee') {
    return (
      <svg viewBox="0 0 640 210" width="100%" role="img" aria-label="Jaidee Local LLM and Deterministic Guardrail Architecture" style={{ display: 'block', maxWidth: '100%', height: 'auto' }}>
        <defs>
          <marker id="arr-j" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill={stroke} />
          </marker>
        </defs>
        <rect x="8" y="8" width="624" height="194" rx="10" fill="none" stroke={stroke} strokeOpacity="0.22" strokeDasharray="5 4" />
        <text x="22" y="28" fill={stroke} opacity="0.55" fontSize="10" fontFamily="monospace">100% ON-DEVICE BOUNDARY (ZERO CLOUD DATA EGRESS)</text>

        {/* User UI */}
        <rect x="26" y="72" width="122" height="68" rx="7" fill="none" stroke={stroke} strokeOpacity="0.6" />
        <text x="87" y="101" textAnchor="middle" fill={stroke} fontSize="12" fontWeight="600">Electron / React</text>
        <text x="87" y="119" textAnchor="middle" fill={stroke} opacity="0.6" fontSize="10" fontFamily="monospace">Private Chat UI</text>

        {/* Lane 1: Local LLM */}
        <rect x="204" y="44" width="194" height="58" rx="7" fill="none" stroke={stroke} strokeOpacity="0.45" />
        <text x="301" y="69" textAnchor="middle" fill={stroke} fontSize="11.5" fontWeight="600">Local LLM (Ollama)</text>
        <text x="301" y="86" textAnchor="middle" fill={stroke} opacity="0.6" fontSize="9.5" fontFamily="monospace">Dialogue Only · No Scoring</text>

        {/* Lane 2: Deterministic Rule Engine */}
        <rect x="204" y="122" width="194" height="64" rx="7" fill={stroke} fillOpacity="0.08" stroke={stroke} strokeOpacity="0.9" strokeWidth="1.4" />
        <text x="301" y="147" textAnchor="middle" fill={stroke} fontSize="11.5" fontWeight="700">Deterministic Rule Engine</text>
        <text x="301" y="164" textAnchor="middle" fill={stroke} opacity="0.7" fontSize="9.5" fontFamily="monospace">PHQ-9 · GAD-7 · Crisis Scan</text>

        {/* Output */}
        <rect x="454" y="72" width="160" height="68" rx="7" fill="none" stroke={stroke} strokeOpacity="0.6" />
        <text x="534" y="99" textAnchor="middle" fill={stroke} fontSize="11.5" fontWeight="600">Auditable Triage</text>
        <text x="534" y="117" textAnchor="middle" fill={stroke} opacity="0.65" fontSize="9.5" fontFamily="monospace">Score + Hotline 1323</text>

        {/* Connectors */}
        <line x1="148" y1="92" x2="202" y2="73" stroke={stroke} strokeOpacity="0.65" markerEnd="url(#arr-j)" />
        <line x1="148" y1="118" x2="202" y2="152" stroke={stroke} strokeOpacity="0.85" strokeWidth="1.4" markerEnd="url(#arr-j)" />
        <line x1="398" y1="73" x2="452" y2="95" stroke={stroke} strokeOpacity="0.5" strokeDasharray="3 3" markerEnd="url(#arr-j)" />
        <line x1="398" y1="154" x2="452" y2="120" stroke={stroke} strokeOpacity="0.9" strokeWidth="1.4" markerEnd="url(#arr-j)" />
      </svg>
    );
  }

  if (id === 'signbridge') {
    return (
      <svg viewBox="0 0 640 190" width="100%" role="img" aria-label="SignBridge Zero-Cloud Edge CNN Pipeline" style={{ display: 'block', maxWidth: '100%', height: 'auto' }}>
        <defs>
          <marker id="arr-s" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill={stroke} />
          </marker>
        </defs>
        {/* Offline Training Strip */}
        <rect x="16" y="14" width="608" height="46" rx="7" fill="none" stroke={stroke} strokeOpacity="0.25" strokeDasharray="4 4" />
        <text x="320" y="41" textAnchor="middle" fill={stroke} opacity="0.7" fontSize="10" fontFamily="monospace">OFFLINE TRAINING: Sign MNIST → Python / Keras CNN (94.8% Test) → Exported Weights</text>

        {/* Browser Runtime Pipeline */}
        <rect x="16" y="80" width="130" height="82" rx="7" fill="none" stroke={stroke} strokeOpacity="0.55" />
        <text x="81" y="114" textAnchor="middle" fill={stroke} fontSize="12" fontWeight="600">Webcam Feed</text>
        <text x="81" y="133" textAnchor="middle" fill={stroke} opacity="0.6" fontSize="9.5" fontFamily="monospace">Real-Time Frames</text>

        <rect x="178" y="80" width="136" height="82" rx="7" fill="none" stroke={stroke} strokeOpacity="0.55" />
        <text x="246" y="114" textAnchor="middle" fill={stroke} fontSize="12" fontWeight="600">MediaPipe ROI</text>
        <text x="246" y="133" textAnchor="middle" fill={stroke} opacity="0.6" fontSize="9.5" fontFamily="monospace">Hand Crop + Norm</text>

        <rect x="346" y="80" width="146" height="82" rx="7" fill={stroke} fillOpacity="0.08" stroke={stroke} strokeOpacity="0.9" strokeWidth="1.4" />
        <text x="419" y="112" textAnchor="middle" fill={stroke} fontSize="12" fontWeight="700">Pure-JS Forward</text>
        <text x="419" y="131" textAnchor="middle" fill={stroke} opacity="0.7" fontSize="9.5" fontFamily="monospace">0 Cloud · 0 Server</text>

        <rect x="524" y="80" width="100" height="82" rx="7" fill="none" stroke={stroke} strokeOpacity="0.55" />
        <text x="574" y="114" textAnchor="middle" fill={stroke} fontSize="12" fontWeight="600">ASL Letter</text>
        <text x="574" y="133" textAnchor="middle" fill={stroke} opacity="0.6" fontSize="9.5" fontFamily="monospace">Live Output</text>

        <line x1="146" y1="121" x2="176" y2="121" stroke={stroke} strokeOpacity="0.7" markerEnd="url(#arr-s)" />
        <line x1="314" y1="121" x2="344" y2="121" stroke={stroke} strokeOpacity="0.7" markerEnd="url(#arr-s)" />
        <line x1="492" y1="121" x2="522" y2="121" stroke={stroke} strokeOpacity="0.7" markerEnd="url(#arr-s)" />
        <line x1="419" y1="60" x2="419" y2="78" stroke={stroke} strokeOpacity="0.65" markerEnd="url(#arr-s)" />
      </svg>
    );
  }

  if (id === 'khaidee-v2') {
    return (
      <svg viewBox="0 0 640 196" width="100%" role="img" aria-label="KhaiDee v2 Monorepo Architecture and 358 Tests" style={{ display: 'block', maxWidth: '100%', height: 'auto' }}>
        <defs>
          <marker id="arr-k" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill={stroke} />
          </marker>
        </defs>
        {/* Two Clients */}
        <rect x="18" y="24" width="144" height="60" rx="7" fill="none" stroke={stroke} strokeOpacity="0.55" />
        <text x="90" y="50" textAnchor="middle" fill={stroke} fontSize="11.5" fontWeight="600">Customer QR Web</text>
        <text x="90" y="67" textAnchor="middle" fill={stroke} opacity="0.6" fontSize="9.5" fontFamily="monospace">Scan → Tap-to-Order</text>

        <rect x="18" y="112" width="144" height="60" rx="7" fill="none" stroke={stroke} strokeOpacity="0.55" />
        <text x="90" y="138" textAnchor="middle" fill={stroke} fontSize="11.5" fontWeight="600">Vendor Queue POS</text>
        <text x="90" y="155" textAnchor="middle" fill={stroke} opacity="0.6" fontSize="9.5" fontFamily="monospace">Live Order Tickets</text>

        {/* API Layer */}
        <rect x="218" y="42" width="176" height="112" rx="7" fill="none" stroke={stroke} strokeOpacity="0.7" />
        <text x="306" y="74" textAnchor="middle" fill={stroke} fontSize="12" fontWeight="600">apps/api</text>
        <text x="306" y="94" textAnchor="middle" fill={stroke} opacity="0.65" fontSize="9.5" fontFamily="monospace">REST Contracts + Sync</text>
        <rect x="236" y="110" width="140" height="28" rx="4" fill={stroke} fillOpacity="0.08" />
        <text x="306" y="128" textAnchor="middle" fill={stroke} fontSize="10" fontFamily="monospace" fontWeight="600">186 Integration Tests</text>

        {/* Pure Domain Layer */}
        <rect x="444" y="42" width="178" height="112" rx="7" fill={stroke} fillOpacity="0.08" stroke={stroke} strokeOpacity="0.9" strokeWidth="1.4" />
        <text x="533" y="74" textAnchor="middle" fill={stroke} fontSize="12" fontWeight="700">packages/domain</text>
        <text x="533" y="94" textAnchor="middle" fill={stroke} opacity="0.7" fontSize="9.5" fontFamily="monospace">Pure Order State Machine</text>
        <rect x="462" y="110" width="142" height="28" rx="4" fill={stroke} fillOpacity="0.1" />
        <text x="533" y="128" textAnchor="middle" fill={stroke} fontSize="10" fontFamily="monospace" fontWeight="600">172 Unit Tests</text>

        <line x1="162" y1="54" x2="216" y2="84" stroke={stroke} strokeOpacity="0.7" markerEnd="url(#arr-k)" />
        <line x1="162" y1="142" x2="216" y2="112" stroke={stroke} strokeOpacity="0.7" markerEnd="url(#arr-k)" />
        <line x1="394" y1="98" x2="442" y2="98" stroke={stroke} strokeOpacity="0.85" strokeWidth="1.4" markerEnd="url(#arr-k)" />
      </svg>
    );
  }

  if (id === 'farmhouse') {
    return (
      <svg viewBox="0 0 640 185" width="100%" role="img" aria-label="Farmhouse Truck-Loading Optimization Pipeline" style={{ display: 'block', maxWidth: '100%', height: 'auto' }}>
        <defs>
          <marker id="arr-f" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill={stroke} />
          </marker>
        </defs>
        <rect x="18" y="48" width="150" height="88" rx="7" fill="none" stroke={stroke} strokeOpacity="0.55" />
        <text x="93" y="82" textAnchor="middle" fill={stroke} fontSize="12" fontWeight="600">40 Distribution</text>
        <text x="93" y="99" textAnchor="middle" fill={stroke} fontSize="12" fontWeight="600">Centers</text>
        <text x="93" y="118" textAnchor="middle" fill={stroke} opacity="0.6" fontSize="9.5" fontFamily="monospace">Baskets + Lat/Lng</text>

        <rect x="218" y="38" width="204" height="108" rx="7" fill={stroke} fillOpacity="0.08" stroke={stroke} strokeOpacity="0.9" strokeWidth="1.4" />
        <text x="320" y="72" textAnchor="middle" fill={stroke} fontSize="12" fontWeight="700">Best-Fit-Decreasing</text>
        <text x="320" y="91" textAnchor="middle" fill={stroke} fontSize="11.5" fontWeight="600">+ Geo Proximity Solver</text>
        <text x="320" y="113" textAnchor="middle" fill={stroke} opacity="0.7" fontSize="9.5" fontFamily="monospace">Min Trucks · Min Empty Space</text>
        <text x="320" y="129" textAnchor="middle" fill={stroke} opacity="0.7" fontSize="9.5" fontFamily="monospace">10-Wheel Truck Capacity</text>

        <rect x="472" y="48" width="150" height="88" rx="7" fill="none" stroke={stroke} strokeOpacity="0.55" />
        <text x="547" y="82" textAnchor="middle" fill={stroke} fontSize="12" fontWeight="600">Leaflet Dispatch</text>
        <text x="547" y="99" textAnchor="middle" fill={stroke} fontSize="12" fontWeight="600">Route Map</text>
        <text x="547" y="118" textAnchor="middle" fill={stroke} opacity="0.6" fontSize="9.5" fontFamily="monospace">React + Vite UI</text>

        <line x1="168" y1="92" x2="216" y2="92" stroke={stroke} strokeOpacity="0.8" markerEnd="url(#arr-f)" />
        <line x1="422" y1="92" x2="470" y2="92" stroke={stroke} strokeOpacity="0.8" markerEnd="url(#arr-f)" />
      </svg>
    );
  }

  if (id === 'cockpit') {
    return (
      <svg viewBox="0 0 640 200" width="100%" role="img" aria-label="Cockpit Cross-Platform Personal OS Architecture" style={{ display: 'block', maxWidth: '100%', height: 'auto' }}>
        <defs>
          <marker id="arr-c" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill={stroke} />
          </marker>
        </defs>
        <rect x="18" y="24" width="170" height="64" rx="7" fill={stroke} fillOpacity="0.08" stroke={stroke} strokeOpacity="0.9" strokeWidth="1.4" />
        <text x="103" y="51" textAnchor="middle" fill={stroke} fontSize="12" fontWeight="700">macOS SwiftUI App</text>
        <text x="103" y="69" textAnchor="middle" fill={stroke} opacity="0.7" fontSize="9.5" fontFamily="monospace">8.2K LOC · Native AVAudio</text>

        <rect x="18" y="114" width="170" height="64" rx="7" fill="none" stroke={stroke} strokeOpacity="0.6" />
        <text x="103" y="141" textAnchor="middle" fill={stroke} fontSize="12" fontWeight="600">Next.js 16 Mobile PWA</text>
        <text x="103" y="159" textAnchor="middle" fill={stroke} opacity="0.65" fontSize="9.5" fontFamily="monospace">Vercel Edge · 5G Access</text>

        <rect x="242" y="64" width="156" height="72" rx="7" fill="none" stroke={stroke} strokeOpacity="0.7" />
        <text x="320" y="95" textAnchor="middle" fill={stroke} fontSize="11.5" fontWeight="600">Sync & Node Bridges</text>
        <text x="320" y="114" textAnchor="middle" fill={stroke} opacity="0.65" fontSize="9.5" fontFamily="monospace">Private Gist · MCP · REST</text>

        <rect x="450" y="24" width="172" height="44" rx="6" fill="none" stroke={stroke} strokeOpacity="0.45" />
        <text x="536" y="50" textAnchor="middle" fill={stroke} fontSize="10.5" fontFamily="monospace">Obsidian Vault + GDrive</text>

        <rect x="450" y="78" width="172" height="44" rx="6" fill="none" stroke={stroke} strokeOpacity="0.45" />
        <text x="536" y="104" textAnchor="middle" fill={stroke} fontSize="10.5" fontFamily="monospace">Canvas 3-Step Submit API</text>

        <rect x="450" y="132" width="172" height="44" rx="6" fill="none" stroke={stroke} strokeOpacity="0.45" />
        <text x="536" y="158" textAnchor="middle" fill={stroke} fontSize="10.5" fontFamily="monospace">Gemini Flash / Whisper</text>

        <line x1="188" y1="56" x2="240" y2="88" stroke={stroke} strokeOpacity="0.75" markerEnd="url(#arr-c)" />
        <line x1="188" y1="146" x2="240" y2="112" stroke={stroke} strokeOpacity="0.75" markerEnd="url(#arr-c)" />
        <line x1="398" y1="84" x2="448" y2="48" stroke={stroke} strokeOpacity="0.6" markerEnd="url(#arr-c)" />
        <line x1="398" y1="100" x2="448" y2="100" stroke={stroke} strokeOpacity="0.6" markerEnd="url(#arr-c)" />
        <line x1="398" y1="116" x2="448" y2="152" stroke={stroke} strokeOpacity="0.6" markerEnd="url(#arr-c)" />
      </svg>
    );
  }

  // Anya
  return (
    <svg viewBox="0 0 640 180" width="100%" role="img" aria-label="Anya Thai Medicine-Label OCR and TTS Pipeline" style={{ display: 'block', maxWidth: '100%', height: 'auto' }}>
      <defs>
        <marker id="arr-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill={stroke} />
        </marker>
      </defs>
      <rect x="18" y="46" width="140" height="84" rx="7" fill="none" stroke={stroke} strokeOpacity="0.55" />
      <text x="88" y="82" textAnchor="middle" fill={stroke} fontSize="12" fontWeight="600">Keyboard Trigger</text>
      <text x="88" y="102" textAnchor="middle" fill={stroke} opacity="0.6" fontSize="9.5" fontFamily="monospace">Webcam Frame (No UI)</text>

      <rect x="206" y="46" width="184" height="84" rx="7" fill={stroke} fillOpacity="0.08" stroke={stroke} strokeOpacity="0.9" strokeWidth="1.4" />
      <text x="298" y="80" textAnchor="middle" fill={stroke} fontSize="12" fontWeight="700">Gemini Vision OCR</text>
      <text x="298" y="100" textAnchor="middle" fill={stroke} opacity="0.7" fontSize="9.5" fontFamily="monospace">Thai Drug + Dosage Parser</text>

      <rect x="438" y="46" width="184" height="84" rx="7" fill="none" stroke={stroke} strokeOpacity="0.55" />
      <text x="530" y="80" textAnchor="middle" fill={stroke} fontSize="12" fontWeight="600">Thai Speech (TTS)</text>
      <text x="530" y="100" textAnchor="middle" fill={stroke} opacity="0.6" fontSize="9.5" fontFamily="monospace">Clear Spoken Instructions</text>

      <line x1="158" y1="88" x2="204" y2="88" stroke={stroke} strokeOpacity="0.8" markerEnd="url(#arr-a)" />
      <line x1="390" y1="88" x2="436" y2="88" stroke={stroke} strokeOpacity="0.8" markerEnd="url(#arr-a)" />
    </svg>
  );
}
