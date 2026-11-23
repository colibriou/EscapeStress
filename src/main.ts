import './styles.css';
import { appConfig, getReturnUrl } from './config/appConfig.ts';
import { conversations, puzzleQuestion, returnInstruction, synthesisInstruction, type Conversation } from './config/conversations.ts';

const introScreen = document.querySelector<HTMLElement>('#intro-screen')!;
const mailboxScreen = document.querySelector<HTMLElement>('#mailbox-screen')!;
const openMailboxButton = document.querySelector<HTMLButtonElement>('#open-mailbox')!;
const conversationList = document.querySelector<HTMLElement>('#conversation-list')!;
const emptyState = document.querySelector<HTMLElement>('#conversation-empty')!;
const conversationContent = document.querySelector<HTMLElement>('#conversation-content')!;
const synthesisButton = document.querySelector<HTMLButtonElement>('#synthesis-button')!;
const returnLink = document.querySelector<HTMLAnchorElement>('#return-link')!;
const motionToggle = document.querySelector<HTMLButtonElement>('#motion-toggle')!;

const viewed = new Set<string>();
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let reduceMotion = motionPreference.matches;
let refreshDreamMotion: (() => void) | undefined;

function renderConversationList(): void {
  conversationList.innerHTML = conversations.map((conversation) => `
    <button class="conversation-item ${conversation.kind === 'draft' ? 'is-draft' : ''}" type="button" data-conversation-id="${conversation.id}" aria-label="${conversation.title}, ${viewed.has(conversation.id) ? 'consulté' : 'non consulté'}">
      <span class="avatar" aria-hidden="true">${conversation.person.charAt(0)}</span>
      <span class="conversation-item-copy">
        <span class="conversation-item-topline"><strong>${conversation.title}</strong><span class="visit-status">${viewed.has(conversation.id) ? 'Consulté' : 'Non consulté'}</span></span>
        <span class="conversation-person">${conversation.person}</span>
        <span class="conversation-preview">${conversation.preview}</span>
      </span>
    </button>
  `).join('');
  conversationList.querySelectorAll<HTMLButtonElement>('[data-conversation-id]').forEach((button) => {
    button.addEventListener('click', () => showConversation(button.dataset.conversationId!));
  });
}

function showConversation(id: string): void {
  const conversation = conversations.find((item) => item.id === id);
  if (!conversation) return;
  viewed.add(id);
  renderConversationList();
  conversationList.querySelector(`[data-conversation-id="${id}"]`)?.classList.add('is-selected');
  emptyState.classList.add('is-hidden');
  conversationContent.classList.remove('is-hidden');
  conversationContent.innerHTML = conversationMarkup(conversation);
  conversationContent.querySelector<HTMLButtonElement>('[data-back-to-list]')?.focus();
}

function conversationMarkup(conversation: Conversation): string {
  const draftNotice = conversation.kind === 'draft' ? '<p class="draft-notice">Brouillon non envoyé · Archive consultable uniquement</p>' : '';
  return `
    <div class="conversation-toolbar">
      <div>
        <p class="conversation-type">${conversation.kind === 'draft' ? 'Brouillon' : 'Conversation archivée'}</p>
        <h3>${conversation.title}</h3>
        <p>${conversation.person}</p>
      </div>
      <button class="back-button" type="button" data-back-to-list>← Tous les échanges</button>
    </div>
    ${draftNotice}
    <div class="message-stack" aria-label="Messages de ${conversation.title}">
      ${conversation.messages.map((message) => `
        <article class="message-row ${message.direction}">
          <span class="message-sender">${message.sender}</span>
          <p class="message-bubble">${message.text}</p>
        </article>
      `).join('')}
    </div>
  `;
}

function showSynthesis(): void {
  conversationList.querySelectorAll('.is-selected').forEach((item) => item.classList.remove('is-selected'));
  emptyState.classList.add('is-hidden');
  conversationContent.classList.remove('is-hidden');
  conversationContent.innerHTML = `
    <div class="conversation-toolbar">
      <div><p class="conversation-type">À garder en tête</p><h3>Consigne de synthèse</h3><p>Une question pour relire les échanges</p></div>
      <button class="back-button" type="button" data-back-to-list>← Tous les échanges</button>
    </div>
    <section class="question-card" aria-labelledby="puzzle-question">
      <span class="question-mark" aria-hidden="true">?</span>
      <p id="puzzle-question">${puzzleQuestion}</p>
    </section>
    <p class="synthesis-copy">${synthesisInstruction}</p>
    <p class="return-instruction">${returnInstruction}</p>
  `;
  conversationContent.querySelector<HTMLButtonElement>('[data-back-to-list]')?.focus();
}

function openMailbox(): void {
  introScreen.classList.add('is-hidden');
  mailboxScreen.classList.remove('is-hidden');
  conversationList.querySelector<HTMLButtonElement>('[data-conversation-id]')?.focus();
}

function configureReturnLink(): void {
  const returnUrl = getReturnUrl();
  if (returnUrl) {
    returnLink.href = returnUrl;
    returnLink.classList.remove('is-hidden');
  }
}

function setMotionPreference(nextValue: boolean): void {
  reduceMotion = nextValue;
  document.body.classList.toggle('reduce-motion', reduceMotion);
  motionToggle.setAttribute('aria-pressed', String(reduceMotion));
  motionToggle.textContent = reduceMotion ? appConfig.restoreMotionLabel : appConfig.reduceMotionLabel;
  refreshDreamMotion?.();
}

async function setupDreamCanvas(): Promise<void> {
  const canvas = document.querySelector<HTMLCanvasElement>('#dream-canvas')!;
  const context = canvas.getContext('webgl2', { antialias: true, alpha: true });
  if (!context) return;
  const {
    WebGLRenderer, Scene, OrthographicCamera, BufferGeometry, Color, BufferAttribute,
    PointsMaterial, Points, Mesh, CircleGeometry, MeshBasicMaterial,
  } = await import('three');
  const renderer = new WebGLRenderer({ canvas, context, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 10);
  camera.position.z = 2;

  const geometry = new BufferGeometry();
  const stars = 180;
  const positions = new Float32Array(stars * 3);
  const colors = new Float32Array(stars * 3);
  for (let index = 0; index < stars; index += 1) {
    positions[index * 3] = (Math.random() - 0.5) * 2.4;
    positions[index * 3 + 1] = (Math.random() - 0.5) * 2.4;
    positions[index * 3 + 2] = 0;
    const color = new Color().setHSL(0.055 + Math.random() * 0.09, 0.63, 0.62 + Math.random() * 0.2);
    colors[index * 3] = color.r;
    colors[index * 3 + 1] = color.g;
    colors[index * 3 + 2] = color.b;
  }
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  geometry.setAttribute('color', new BufferAttribute(colors, 3));
  const material = new PointsMaterial({ size: 0.009, vertexColors: true, transparent: true, opacity: 0.7 });
  const points = new Points(geometry, material);
  scene.add(points);

  const glow = new Mesh(new CircleGeometry(0.62, 64), new MeshBasicMaterial({ color: 0xe6a271, transparent: true, opacity: 0.08 }));
  glow.position.set(0.62, 0.2, -0.1);
  scene.add(glow);

  const animate = (time: number) => {
    const elapsed = time / 1000;
    points.rotation.z = elapsed * 0.008;
    glow.scale.setScalar(1 + Math.sin(elapsed * 0.35) * 0.035);
    renderer.render(scene, camera);
  };
  const updateMotion = () => {
    renderer.render(scene, camera);
    renderer.setAnimationLoop(reduceMotion ? null : animate);
  };
  updateMotion();
  refreshDreamMotion = updateMotion;
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  });
  canvas.classList.remove('is-hidden');
}

renderConversationList();
configureReturnLink();
setMotionPreference(reduceMotion);
openMailboxButton.addEventListener('click', openMailbox);
synthesisButton.addEventListener('click', showSynthesis);
motionToggle.addEventListener('click', () => setMotionPreference(!reduceMotion));
motionPreference.addEventListener('change', (event) => setMotionPreference(event.matches));
conversationContent.addEventListener('click', (event) => {
  if (!(event.target instanceof Element) || !event.target.closest('[data-back-to-list]')) return;
  const selected = conversationList.querySelector<HTMLButtonElement>('.is-selected');
  selected?.classList.remove('is-selected');
  conversationContent.classList.add('is-hidden');
  emptyState.classList.remove('is-hidden');
  (selected ?? synthesisButton).focus();
});
void setupDreamCanvas().catch((error: unknown) => {
  console.warn('Décor Three.js indisponible. Le fond CSS est utilisé.', error);
});
