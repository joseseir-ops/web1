import { personajes } from './datos.js';


const ESTADOS = {
  Alive:   { texto: 'Vivo',        clases: 'bg-emerald-100 text-emerald-700' },
  Dead:    { texto: 'Muerto',      clases: 'bg-rose-100 text-rose-700' },
  unknown: { texto: 'Desconocido', clases: 'bg-slate-200 text-slate-600' },
};

const tarjetaHTML = (p) => `
  <article class="flex flex-col overflow-hidden rounded-2xl bg-white shadow group transition hover:-translate-y-1 hover:shadow-xl dark:bg-slate-800">
    <div class="overflow-hidden">
      <img src="${p.image}" alt="${p.name}" class="aspect-square w-full object-cover transition group-hover:scale-105">
    </div>
    <div class="flex flex-1 flex-col gap-2 p-4">
      <h3 class="text-lg font-bold text-slate-900 dark:text-white">${p.name}</h3>
      <span class="w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold ${ESTADOS[p.status].clases}">● ${ESTADOS[p.status].texto}</span>
      <p class="text-sm text-slate-500 dark:text-slate-400">${p.species} · ${p.origin.name}</p>
      <button type="button" data-id="${p.id}" class="mt-auto rounded-lg bg-indigo-600 py-2 font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Ver detalle
      </button>
    </div>
  </article>`;

const btnMenu = document.getElementById('btn-menu');
const menu = document.getElementById('menu');

btnMenu.addEventListener('click', function () {
  menu.classList.toggle('hidden');
  const abierto = !menu.classList.contains('hidden');
  btnMenu.setAttribute('aria-expanded', abierto);
});

const modal = document.getElementById('modal-detalle');

const abrirDetalle = (personaje) => {
  const { name, image, status, species, type, origin, location } = personaje;
  document.getElementById('modal-nombre').textContent = name;
  document.getElementById('modal-img').src = image;
  document.getElementById('modal-img').alt = name;
  document.getElementById('modal-estado').textContent = ESTADOS[status].texto;
  document.getElementById('modal-especie').textContent = type ? `${species} (${type})` : species;
  document.getElementById('modal-origen').textContent = origin.name;
  document.getElementById('modal-ubicacion').textContent = location.name;
  modal.showModal();
};

modal.addEventListener('click', function (e) {
  if (e.target === modal) modal.close();
});

const grilla = document.querySelector('#grilla');
const contador = document.querySelector('#contador');

const render = (lista) => {
  grilla.innerHTML = lista.map(tarjetaHTML).join('');
  contador.textContent = `${lista.length} de ${personajes.length} personajes`;
};


render(personajes);

const formFiltros = document.querySelector('form[role="search"]');
const inputBusqueda = document.getElementById('busqueda');
const selectEstado = document.getElementById('filtro-estado');

formFiltros.addEventListener('submit', (evento) => {
  evento.preventDefault();
  
  const termino = inputBusqueda.value.toLowerCase().trim();
  const estadoSeleccionado = selectEstado.value; 

  const resultados = personajes.filter((p) => {
    const coincideNombre = p.name.toLowerCase().includes(termino);
    const coincideEstado = estadoSeleccionado === '' || p.status.toLowerCase() === estadoSeleccionado.toLowerCase();
    
    return coincideNombre && coincideEstado;
  });

  render(resultados);
});


grilla.addEventListener('click', (evento) => {
  const boton = evento.target.closest('[data-id]');
  if (!boton) return;
  
  const idPersonaje = Number(boton.dataset.id);
  const personaje = personajes.find((p) => p.id === idPersonaje);
  abrirDetalle(personaje);
});