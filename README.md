import { useState, useEffect } from "react";
const LOGO = "data:image/png;base64,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";

const BARBEROS = ["Agustín Saragoza", "Kevin Asinari", "Tobias Villafañe"];
const ADMIN_NOMBRE = "Alejandra Aguilera";
// Usuarios y claves simples (editable). Admin + cada barbero.
const USUARIOS = {
  "Administración": { clave: "pdc", rol: "admin" },
  "Agustín Saragoza": { clave: "1111", rol: "barbero" },
  "Kevin Asinari":    { clave: "2222", rol: "barbero" },
  "Tobias Villafañe": { clave: "3333", rol: "barbero" },
};
const SERVICIOS = ["Corte", "Corte y Barba"];
const MEDIOS_PAGO = ["Efectivo", "Transferencia", "Posnet", "QR MercadoPago"];
const MEDIOS_PAGO_BARBERO = ["Efectivo", "MercadoPago"]; // a barberos solo estos
const IIBB = 0.03;
const CAJA_INICIAL_EFECTIVO = 10000;
const CAJA_INICIAL_MP = 0;

// Membresías
const TIPOS_PASE = ["Basic Mensual", "Plus Trimestral", "Premium Anual"];
const PASE_CONFIG = {
  "Basic Mensual":   { dias: 30,  cuotas: 1,  montoCuota: 15000 },
  "Plus Trimestral": { dias: 90,  cuotas: 3,  montoCuota: 16500 },
  "Premium Anual":   { dias: 365, cuotas: 12, montoCuota: 16500 },
};

// PDC Score
const SCORE_PERSONAS = [...BARBEROS, "Recepción / Admin"];
const DEFAULT_CAT_BARBERO = [
  { t: "Atención al cliente", pts: 1 },
  { t: "Ofrece membresía", pts: 2 },
  { t: "Reseña en Google", pts: 2 },
  { t: "Foto o video", pts: 1 },
  { t: "Cliente referido", pts: 3 },
  { t: "Contenido / reel", pts: 2 },
  { t: "Trabajo en equipo", pts: 1 },
  { t: "Idea para PDC", pts: 2 },
];
const DEFAULT_CAT_RECEPCION = [
  { t: "WhatsApp al día", pts: 1 },
  { t: "Agenda organizada", pts: 1 },
  { t: "Cobro correcto", pts: 2 },
  { t: "Activación Members", pts: 2 },
  { t: "Historias / Reposteo", pts: 1 },
  { t: "Google Maps", pts: 1 },
  { t: "Reseñas respondidas", pts: 1 },
  { t: "Idea para PDC", pts: 2 },
];
const CATS_KEY = "pdc_barberia_cats";

const STORAGE_KEY = "pdc_barberia_cortes";
const PAGOS_KEY   = "pdc_barberia_pagos";
const CIERRES_KEY = "pdc_barberia_cierres";
const PASES_KEY   = "pdc_barberia_pases";
const SCORE_KEY   = "pdc_barberia_score";
const TURNOS_KEY  = "pdc_barberia_turnos";
const PEND_KEY    = "pdc_barberia_pendientes";
const SESION_KEY  = "pdc_barberia_sesion";
const CLIENTES_KEY = "pdc_barberia_clientes";
const GASTOS_KEY  = "pdc_barberia_gastos";

function billetera(medio) { return medio === "Efectivo" ? "Efectivo" : "MercadoPago"; }
function tieneIIBB(medio) { return medio === "Posnet" || medio === "QR MercadoPago"; }
function netoIngreso(medio, bruto) { return tieneIIBB(medio) ? Math.round(bruto * (1 - IIBB)) : bruto; }
function iibbDe(medio, bruto) { return tieneIIBB(medio) ? bruto - netoIngreso(medio, bruto) : 0; }
function comisionBarbero(servicio, propina = 0) {
  if (servicio === "Corte") return 7500 + propina;
  if (servicio === "Corte y Barba") return 10000 + propina;
  return propina;
}
function formatFecha(iso) { const d = new Date(iso); return d.toLocaleDateString("es-AR", { day:"2-digit", month:"2-digit", year:"numeric" }); }
function formatHora(iso) { const d = new Date(iso); return d.toLocaleTimeString("es-AR", { hour:"2-digit", minute:"2-digit" }); }
function fmt(n) { return "$" + Math.round(Number(n)).toLocaleString("es-AR"); }
function hoy() { return new Date().toISOString().slice(0, 10); }
function addDias(iso, dias) { const d = new Date(iso); d.setDate(d.getDate() + dias); return d.toISOString(); }
function diasEntre(desde, hasta) { return Math.floor((new Date(hasta) - new Date(desde)) / 86400000); }

// Generar cuotas de comisión para un pase
function generarCuotas(tipo, fechaCompra) {
  const cfg = PASE_CONFIG[tipo];
  const cuotas = [];
  for (let i = 1; i <= cfg.cuotas; i++) {
    cuotas.push({ n: i, monto: cfg.montoCuota, vence: addDias(fechaCompra, 30 * i), pagado: 0 });
  }
  return cuotas;
}

const initialForm     = { servicio: "", cliente: "", telefono: "", barbero: "", medioPago: "", monto: "", propina: "" };
const initialPagoForm = { barbero: "", monto: "", medioPago: "", nota: "" };
const initialPaseForm = { cliente: "", telefono: "", barbero: "", tipo: "", monto: "", medioPago: "" };

function NuevaCat({ grupo, onAdd, sInp }) {
  const [t, setT] = useState("");
  const [p, setP] = useState("");
  const [unica, setUnica] = useState(false);
  return (
    <div style={{ marginTop:6 }}>
      <div style={{ display:"flex",alignItems:"center",gap:8 }}>
        <input placeholder="Nueva categoría" value={t} onChange={e=>setT(e.target.value)} style={{ ...sInp(false),flex:1,padding:"6px 8px" }} />
        <input type="number" placeholder="pts" value={p} onChange={e=>setP(e.target.value)} style={{ ...sInp(false),width:56,padding:"6px 8px",textAlign:"center" }} />
        <button onClick={()=>{ onAdd(grupo,t,p,unica); setT(""); setP(""); setUnica(false); }} style={{ background:"#2a2a2a",border:"none",borderRadius:6,color:"#f0ede6",fontSize:18,width:32,height:32,cursor:"pointer" }}>+</button>
      </div>
      <div style={{ display:"flex",gap:6,marginTop:6 }}>
        {[{v:false,l:"Permanente"},{v:true,l:"Única vez"}].map(o=>(
          <button key={o.l} onClick={()=>setUnica(o.v)} style={{ flex:1,padding:"6px 0",borderRadius:6,border:`1px solid ${unica===o.v?"#f2efe8":"#2a2a2a"}`,background:unica===o.v?"#1f1d18":"transparent",color:unica===o.v?"#f2efe8":"#777",fontSize:11.5,fontWeight:600,cursor:"pointer" }}>{o.l}</button>
        ))}
      </div>
    </div>
  );
}

// Tarjeta de cliente con acciones (historial, agendar, whatsapp)
function ClienteCard({ nombre, telefono, servicios, abierto, onToggle, onAgendar, fmt, formatFecha, waCliente }) {
  return (
    <div style={{ background:"#141414",borderRadius:12,padding:"14px",border:"1px solid #1e1e1e",marginBottom:8 }}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:15,fontWeight:700 }}>{nombre}</div>
          <div style={{ fontSize:12,color:"#888",marginTop:2 }}>{servicios.length} servicio{servicios.length!==1?"s":""}{telefono?` · 📞 ${telefono}`:" · sin teléfono"}</div>
        </div>
      </div>
      <div style={{ display:"flex",gap:8,marginTop:10,flexWrap:"wrap" }}>
        <button onClick={onToggle} style={{ flex:"1 0 auto",padding:"8px 10px",borderRadius:8,border:"none",background:"#2a2a2a",color:"#f0ede6",fontSize:12,fontWeight:600,cursor:"pointer" }}>{abierto?"Ocultar":"Historial"}</button>
        <button onClick={onAgendar} style={{ flex:"1 0 auto",padding:"8px 10px",borderRadius:8,border:"none",background:"#2a2a2a",color:"#f0ede6",fontSize:12,fontWeight:600,cursor:"pointer" }}>Agendar turno</button>
        {telefono && <a href={waCliente(nombre,telefono)} target="_blank" rel="noopener noreferrer" style={{ flex:"1 0 auto",textAlign:"center",textDecoration:"none",padding:"8px 10px",borderRadius:8,background:"#1e3324",color:"#7ec87e",fontSize:12,fontWeight:700 }}>💬 WhatsApp</a>}
      </div>
      {abierto && (
        <div style={{ marginTop:10,borderTop:"1px solid #232323",paddingTop:10 }}>
          {servicios.length===0
            ? <div style={{ fontSize:13,color:"#555" }}>Sin servicios registrados.</div>
            : servicios.map(c=>(
              <div key={c.id} style={{ display:"flex",justifyContent:"space-between",fontSize:13,padding:"4px 0" }}>
                <span style={{ color:"#aaa" }}>{c.servicio} · {c.barbero.split(" ")[0]}</span>
                <span style={{ color:"#888" }}>{formatFecha(c.fecha)} · {fmt(c.monto)}</span>
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}

// Input de cliente con autocompletado. value = nombre. Al elegir uno guardado, llama onPick(cliente).
function ClienteInput({ value, onChange, onPick, clientes, err, sInp, placeholder="Nombre del cliente" }) {
  const [focus, setFocus] = useState(false);
  const q = (value||"").trim().toLowerCase();
  const matches = q.length >= 1
    ? clientes.filter(c => c.nombre.toLowerCase().includes(q) && c.nombre.toLowerCase() !== q).slice(0, 5)
    : [];
  const exacto = clientes.find(c => c.nombre.toLowerCase() === q);
  return (
    <div style={{ position:"relative" }}>
      <input placeholder={placeholder} value={value} style={sInp(err)}
        onChange={e=>onChange(e.target.value)}
        onFocus={()=>setFocus(true)}
        onBlur={()=>setTimeout(()=>setFocus(false),150)} />
      {exacto && <div style={{ position:"absolute",right:10,top:11,fontSize:14,color:"#7ec87e" }}>✓</div>}
      {focus && matches.length>0 && (
        <div style={{ position:"absolute",top:"calc(100% + 4px)",left:0,right:0,background:"#1c1c1c",border:"1px solid #2a2a2a",borderRadius:8,zIndex:50,overflow:"hidden",boxShadow:"0 6px 20px rgba(0,0,0,0.5)" }}>
          {matches.map((c,i)=>(
            <button key={i} onClick={()=>{ onChange(c.nombre); onPick && onPick(c); setFocus(false); }} style={{ display:"block",width:"100%",textAlign:"left",background:"transparent",border:"none",borderBottom:i<matches.length-1?"1px solid #232323":"none",padding:"10px 12px",cursor:"pointer",color:"#f0ede6" }}>
              <div style={{ fontSize:14 }}>{c.nombre}</div>
              {c.telefono && <div style={{ fontSize:11,color:"#777" }}>📞 {c.telefono}</div>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [cortes, setCortes]   = useState(() => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]"); } catch { return []; } });
  const [pagos, setPagos]     = useState(() => { try { return JSON.parse(localStorage.getItem(PAGOS_KEY)||"[]"); } catch { return []; } });
  const [cierres, setCierres] = useState(() => { try { return JSON.parse(localStorage.getItem(CIERRES_KEY)||"[]"); } catch { return []; } });
  const [pases, setPases]     = useState(() => { try { return JSON.parse(localStorage.getItem(PASES_KEY)||"[]"); } catch { return []; } });
  const [scores, setScores]   = useState(() => { try { return JSON.parse(localStorage.getItem(SCORE_KEY)||"[]"); } catch { return []; } });
  const [cats, setCats]       = useState(() => { try { const s=JSON.parse(localStorage.getItem(CATS_KEY)); return s||{ barbero:DEFAULT_CAT_BARBERO, recepcion:DEFAULT_CAT_RECEPCION }; } catch { return { barbero:DEFAULT_CAT_BARBERO, recepcion:DEFAULT_CAT_RECEPCION }; } });
  const [clientes, setClientes] = useState(() => { try { return JSON.parse(localStorage.getItem(CLIENTES_KEY)||"[]"); } catch { return []; } });
  const [gastos, setGastos]     = useState(() => { try { return JSON.parse(localStorage.getItem(GASTOS_KEY)||"[]"); } catch { return []; } });
  const [turnos, setTurnos]   = useState(() => { try { return JSON.parse(localStorage.getItem(TURNOS_KEY)||"[]"); } catch { return []; } });
  const [pendientes, setPendientes] = useState(() => { try { return JSON.parse(localStorage.getItem(PEND_KEY)||"[]"); } catch { return []; } });
  const [sesion, setSesion]   = useState(() => { try { return JSON.parse(localStorage.getItem(SESION_KEY)||"null"); } catch { return null; } });
  const [loginUser, setLoginUser] = useState("");
  const [loginClave, setLoginClave] = useState("");
  const [loginError, setLoginError] = useState("");

  const [form, setForm]     = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [vista, setVista]   = useState("registrar");
  const [toast, setToast]   = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [modoFiltro, setModoFiltro]   = useState("dia");
  const [filtroDia, setFiltroDia]     = useState(hoy());
  const [filtroDesde, setFiltroDesde] = useState(hoy());
  const [filtroHasta, setFiltroHasta] = useState(hoy());

  const [pagoForm, setPagoForm]           = useState(initialPagoForm);
  const [pagoErrors, setPagoErrors]       = useState({});
  const [barberoDetalle, setBarberoDetalle] = useState(null);
  const [confirmDeletePago, setConfirmDeletePago] = useState(null);

  const [contadoEfectivo, setContadoEfectivo] = useState("");
  const [contadoMP, setContadoMP]             = useState("");
  const [confirmDeleteCierre, setConfirmDeleteCierre] = useState(null);
  const [gastoForm, setGastoForm] = useState({ monto:"", desc:"", medioPago:"" });
  const [confirmDeleteGasto, setConfirmDeleteGasto] = useState(null);
  const [clienteDetalle, setClienteDetalle] = useState(null);
  const [clienteBuscar, setClienteBuscar] = useState("");
  const [confirmLogro, setConfirmLogro] = useState(null);
  const [confirmSolicitud, setConfirmSolicitud] = useState(null);

  // Membresías
  const [paseForm, setPaseForm]       = useState(initialPaseForm);
  const [paseErrors, setPaseErrors]   = useState({});
  const [paseDetalle, setPaseDetalle] = useState(null);
  const [confirmDeletePase, setConfirmDeletePase] = useState(null);
  const [visitaBarbero, setVisitaBarbero] = useState({}); // {paseId: barbero}
  const [visitaPropina, setVisitaPropina] = useState({}); // {paseId: monto}
  const [visitaMedio, setVisitaMedio]     = useState({}); // {paseId: medio}

  // Pago de cuota modal
  const [cuotaPago, setCuotaPago] = useState(null); // {paseId, n, restante}
  const [cuotaMonto, setCuotaMonto] = useState("");
  const [cuotaMedio, setCuotaMedio] = useState("");

  // PDC Score
  const [scorePersona, setScorePersona] = useState("");
  const [scoreCat, setScoreCat]         = useState("");
  const [scoreNota, setScoreNota]       = useState("");
  const [scorePuntos, setScorePuntos]   = useState("");
  const [scoreModo, setScoreModo]       = useState("total"); // "total" | "semana"
  const [confirmDeleteScore, setConfirmDeleteScore] = useState(null);
  const [nuevaCatT, setNuevaCatT] = useState("");
  const [nuevaCatPts, setNuevaCatPts] = useState("");

  // Turnos
  const [turnoForm, setTurnoForm] = useState({ fecha: hoy(), hora: "", cliente: "", telefono: "", barba: false, barbero: "", nota: "" });
  const [turnoErrors, setTurnoErrors] = useState({});
  const [turnoModo, setTurnoModo] = useState("dia"); // "dia" | "semana"
  const [turnoFiltroBarbero, setTurnoFiltroBarbero] = useState("Todos");
  const [turnoFecha, setTurnoFecha] = useState(hoy());
  const [confirmDeleteTurno, setConfirmDeleteTurno] = useState(null);

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(cortes)); }, [cortes]);
  useEffect(() => { localStorage.setItem(PAGOS_KEY,   JSON.stringify(pagos));  }, [pagos]);
  useEffect(() => { localStorage.setItem(CIERRES_KEY, JSON.stringify(cierres));}, [cierres]);
  useEffect(() => { localStorage.setItem(PASES_KEY,   JSON.stringify(pases));  }, [pases]);
  useEffect(() => { localStorage.setItem(SCORE_KEY,   JSON.stringify(scores)); }, [scores]);
  useEffect(() => { localStorage.setItem(CATS_KEY,    JSON.stringify(cats)); }, [cats]);
  useEffect(() => { localStorage.setItem(CLIENTES_KEY, JSON.stringify(clientes)); }, [clientes]);
  useEffect(() => { localStorage.setItem(GASTOS_KEY,   JSON.stringify(gastos)); }, [gastos]);
  useEffect(() => { localStorage.setItem(TURNOS_KEY,  JSON.stringify(turnos)); }, [turnos]);
  useEffect(() => { localStorage.setItem(PEND_KEY,    JSON.stringify(pendientes)); }, [pendientes]);
  useEffect(() => { localStorage.setItem(SESION_KEY,  JSON.stringify(sesion)); }, [sesion]);
  useEffect(() => { if (sesion?.rol === "admin" && ["barbero","misclientes","bcargar","bscore","bhistorial"].includes(vista)) setVista("inicio"); }, [sesion]);
  useEffect(() => { if (sesion?.rol === "barbero") { setTurnoForm(f => ({ ...f, barbero: sesion.usuario })); if (!["barbero","misclientes","bcargar","bscore","bhistorial","turnos"].includes(vista)) setVista("barbero"); } }, [sesion]);
  useEffect(() => { if (toast) { const t=setTimeout(()=>setToast(null),2500); return ()=>clearTimeout(t); } }, [toast]);

  // ── CORTES ──
  function validate() {
    const e = {};
    if (!form.servicio) e.servicio = true;
    if (!form.cliente.trim()) e.cliente = true;
    if (!form.barbero) e.barbero = true;
    if (!form.medioPago) e.medioPago = true;
    if (!form.monto || isNaN(Number(form.monto)) || Number(form.monto) <= 0) e.monto = true;
    return e;
  }
  function guardarCliente(nombre, telefono) {
    const n = (nombre||"").trim(); if (!n) return;
    const tel = (telefono||"").trim();
    setClientes(prev => {
      const idx = prev.findIndex(c => c.nombre.toLowerCase() === n.toLowerCase());
      if (idx >= 0) {
        // actualizar teléfono si vino uno nuevo y no había
        if (tel && !prev[idx].telefono) { const cp=[...prev]; cp[idx]={ ...cp[idx], telefono:tel }; return cp; }
        return prev;
      }
      return [...prev, { nombre: n, telefono: tel }];
    });
  }
  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    const propina = form.propina ? Number(form.propina) : 0;
    setCortes(prev => [{
      id: Date.now(), fecha: new Date().toISOString(),
      servicio: form.servicio, cliente: form.cliente.trim(),
      barbero: form.barbero, medioPago: form.medioPago,
      monto: Number(form.monto), propina,
      comision: comisionBarbero(form.servicio, propina),
    }, ...prev]);
    guardarCliente(form.cliente, form.telefono);
    setForm(initialForm); setErrors({});
    setToast("¡Corte registrado!");
  }
  function handleDelete(id) { setCortes(prev => prev.filter(c => c.id !== id)); setConfirmDelete(null); setToast("Corte eliminado"); }
  function handleDeletePago(id) {
    const pago = pagos.find(p => p.id === id);
    if (pago && pago.tipo === "membresia" && pago.paseId != null) {
      setPases(prev => prev.map(p => p.id === pago.paseId
        ? { ...p, cuotas: p.cuotas.map(c => c.n === pago.cuotaN ? { ...c, pagado: Math.max(0, c.pagado - pago.monto) } : c) }
        : p));
    }
    setPagos(prev => prev.filter(p => p.id !== id));
    setConfirmDeletePago(null); setToast("Pago eliminado");
  }
  function handleRegistrarPago() {
    const e = {};
    if (!pagoForm.barbero) e.barbero = true;
    if (!pagoForm.medioPago) e.medioPago = true;
    if (!pagoForm.monto || isNaN(Number(pagoForm.monto)) || Number(pagoForm.monto) <= 0) e.monto = true;
    if (Object.keys(e).length) { setPagoErrors(e); return; }
    setPagos(prev => [{
      id: Date.now(), fecha: new Date().toISOString(),
      barbero: pagoForm.barbero, monto: Number(pagoForm.monto),
      medioPago: pagoForm.medioPago, nota: pagoForm.nota.trim(),
      tipo: "corte",
    }, ...prev]);
    setPagoForm(initialPagoForm); setPagoErrors({});
    setToast("Pago registrado");
  }
  function handleDeleteCierre(id) { setCierres(prev => prev.filter(c => c.id !== id)); setConfirmDeleteCierre(null); setToast("Cierre eliminado"); }

  // PDC Score
  function inicioSemana() {
    const d = new Date(); const day = (d.getDay()+6)%7; // lunes=0
    d.setHours(0,0,0,0); d.setDate(d.getDate()-day);
    return d.toISOString();
  }
  // Lista de categorías según la persona
  function catsDe(persona) { return persona === "Recepción / Admin" ? cats.recepcion : cats.barbero; }
  function puntosDeCat(persona, titulo) { const c = catsDe(persona).find(x => x.t === titulo); return c ? c.pts : 1; }
  // ¿Una categoría de única vez ya fue cumplida por esa persona?
  function catCumplida(persona, c) {
    if (!c.unica) return false;
    return scores.some(s => s.persona === persona && s.categoria === c.t);
  }
  // Categorías disponibles para sumar (oculta las de única vez ya cumplidas)
  function catsDisponibles(persona) {
    return catsDe(persona).filter(c => !catCumplida(persona, c));
  }

  function handleAgregarScore() {
    if (!scorePersona || !scoreCat) { setToast("Elegí persona y categoría"); return; }
    const pts = puntosDeCat(scorePersona, scoreCat);
    setScores(prev => [{ id: Date.now(), fecha: new Date().toISOString(), persona: scorePersona, categoria: scoreCat, nota: scoreNota.trim(), puntos: pts }, ...prev]);
    setScoreCat(""); setScoreNota("");
    setToast("Punto cargado");
  }
  function handleDeleteScore(id) { setScores(prev => prev.filter(s => s.id !== id)); setConfirmDeleteScore(null); setToast("Registro eliminado"); }
  function scoresFiltrados() {
    if (scoreModo === "total") return scores;
    const ini = inicioSemana();
    return scores.filter(s => s.fecha >= ini);
  }
  function puntosPersona(p) {
    return scoresFiltrados().filter(s => s.persona === p).reduce((a, s) => a + s.puntos, 0);
  }
  // Sumar un logro directo (usado por Alejandra en Inicio)
  function sumarLogro(persona, c) {
    setScores(prev => [{ id: Date.now(), fecha: new Date().toISOString(), persona, categoria: c.t, nota: "", puntos: c.pts }, ...prev]);
    setToast(`+${c.pts} · ${c.t}`);
  }
  // CRUD categorías (grupo = "barbero" | "recepcion")
  function agregarCat(grupo, titulo, pts, unica) {
    const t = titulo.trim(); const p = Number(pts);
    if (!t || isNaN(p) || p <= 0) { setToast("Poné nombre y puntos válidos"); return; }
    setCats(prev => ({ ...prev, [grupo]: [...prev[grupo], { t, pts: p, unica: !!unica }] }));
    setToast("Categoría agregada");
  }
  function editarCatPts(grupo, idx, pts) {
    const p = Number(pts); if (isNaN(p)) return;
    setCats(prev => ({ ...prev, [grupo]: prev[grupo].map((c,i)=> i===idx ? { ...c, pts: p } : c) }));
  }
  function toggleCatUnica(grupo, idx) {
    setCats(prev => ({ ...prev, [grupo]: prev[grupo].map((c,i)=> i===idx ? { ...c, unica: !c.unica } : c) }));
  }
  function borrarCat(grupo, idx) {
    setCats(prev => ({ ...prev, [grupo]: prev[grupo].filter((_,i)=> i!==idx) }));
  }

  // ── SESIÓN ──
  function handleLogin() {
    const u = USUARIOS[loginUser];
    if (!u) { setLoginError("Elegí un usuario"); return; }
    if (loginClave !== u.clave) { setLoginError("Clave incorrecta"); return; }
    setSesion({ usuario: loginUser, rol: u.rol });
    setLoginUser(""); setLoginClave(""); setLoginError("");
    setVista(u.rol === "admin" ? "inicio" : "barbero");
  }
  function handleLogout() { setSesion(null); setVista("turnos"); }
  const esAdmin = sesion?.rol === "admin";
  const barberoActivo = sesion?.rol === "barbero" ? sesion.usuario : null;

  // ── APROBACIONES ──
  function solicitarCorte(data) {
    setPendientes(prev => [{ id: Date.now(), kind: "corte", solicitante: barberoActivo, fecha: new Date().toISOString(), data }, ...prev]);
    setToast("Corte enviado a aprobación");
  }
  function solicitarPunto(data) {
    setPendientes(prev => [{ id: Date.now(), kind: "score", solicitante: barberoActivo, fecha: new Date().toISOString(), data }, ...prev]);
    setToast("Punto solicitado a Alejandra");
  }
  function solicitarMembresia(data) {
    setPendientes(prev => [{ id: Date.now(), kind: "membresia", solicitante: barberoActivo, fecha: new Date().toISOString(), data }, ...prev]);
    setToast("Membresía enviada a aprobación");
  }
  function aprobarPendiente(id) {
    const p = pendientes.find(x => x.id === id);
    if (!p) return;
    if (p.kind === "corte") {
      const f = p.data;
      const propina = f.propina ? Number(f.propina) : 0;
      setCortes(prev => [{ id: Date.now(), fecha: new Date().toISOString(), servicio: f.servicio, cliente: f.cliente, barbero: f.barbero, medioPago: f.medioPago, monto: Number(f.monto), propina, comision: comisionBarbero(f.servicio, propina) }, ...prev]);
      guardarCliente(f.cliente, f.telefono || "");
    } else if (p.kind === "score") {
      const d = p.data;
      setScores(prev => [{ id: Date.now(), fecha: new Date().toISOString(), persona: d.persona, categoria: d.categoria, nota: d.nota || "", puntos: d.puntos }, ...prev]);
    } else if (p.kind === "membresia") {
      const d = p.data;
      const fechaCompra = new Date().toISOString();
      setPases(prev => [{ id: Date.now(), cliente: d.cliente, barbero: d.barbero, tipo: d.tipo, fechaCompra, vence: addDias(fechaCompra, PASE_CONFIG[d.tipo].dias), monto: Number(d.monto), medioPago: d.medioPago, visitas: [], cuotas: generarCuotas(d.tipo, fechaCompra) }, ...prev]);
      guardarCliente(d.cliente, d.telefono || "");
    }
    setPendientes(prev => prev.filter(x => x.id !== id));
    setToast("Aprobado");
  }
  function rechazarPendiente(id) { setPendientes(prev => prev.filter(x => x.id !== id)); setToast("Rechazado"); }

  // ── TURNOS ──
  function handleAgregarTurno() {
    const e = {};
    if (!turnoForm.fecha) e.fecha = true;
    if (!turnoForm.hora) e.hora = true;
    if (!turnoForm.cliente.trim()) e.cliente = true;
    if (!turnoForm.telefono.trim()) e.telefono = true;
    if (!turnoForm.barbero) e.barbero = true;
    if (Object.keys(e).length) { setTurnoErrors(e); return; }
    setTurnos(prev => [...prev, {
      id: Date.now(), fecha: turnoForm.fecha, hora: turnoForm.hora,
      cliente: turnoForm.cliente.trim(), telefono: turnoForm.telefono.trim(),
      barba: turnoForm.barba, barbero: turnoForm.barbero, nota: turnoForm.nota.trim(),
    }]);
    guardarCliente(turnoForm.cliente, turnoForm.telefono);
    setTurnoForm({ fecha: turnoForm.fecha, hora: "", cliente: "", telefono: "", barba: false, barbero: barberoActivo || "", nota: "" });
    setTurnoErrors({});
    setToast("Turno agendado");
  }
  function handleDeleteTurno(id) { setTurnos(prev => prev.filter(t => t.id !== id)); setConfirmDeleteTurno(null); setToast("Turno eliminado"); }
  function rangoSemana(fechaISO) {
    const d = new Date(fechaISO + "T12:00:00");
    const day = (d.getDay()+6)%7; // lunes=0
    const lunes = new Date(d); lunes.setDate(d.getDate()-day);
    const dom = new Date(lunes); dom.setDate(lunes.getDate()+6);
    return { desde: lunes.toISOString().slice(0,10), hasta: dom.toISOString().slice(0,10) };
  }
  // Horas hasta el turno (para alerta 48hs)
  function horasHasta(fecha, hora) {
    const dt = new Date(`${fecha}T${hora || "00:00"}:00`);
    return (dt - new Date()) / 3600000;
  }
  // Arma link de WhatsApp con mensaje ameno
  function soloDigitos(tel) { const t=(tel||"").replace(/[^\d]/g,""); return t.startsWith("54")?t:"54"+t; }
  function waLink(t) {
    const num = soloDigitos(t.telefono);
    const d = new Date(`${t.fecha}T12:00:00`);
    const dia = d.toLocaleDateString("es-AR", { weekday:"long", day:"2-digit", month:"long" });
    const msg = `¡Hola ${t.cliente}! 💈 Te recordamos tu turno en PDC Barbería el ${dia} a las ${t.hora} con ${t.barbero.split(" ")[0]}. ¡Te esperamos para dejarte impecable! Si no podés venir, avisanos así liberamos el lugar. 🙌`;
    return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
  }
  // WhatsApp ameno genérico para un cliente
  function waCliente(nombre, telefono) {
    const num = soloDigitos(telefono);
    const msg = `¡Hola ${nombre}! 💈 Te escribimos de PDC Barbería. ¿Cómo andás? Cuando quieras coordinar tu próximo turno avisanos. ¡Te esperamos! 🙌`;
    return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
  }
  // Teléfono conocido de un cliente (desde la libreta o sus turnos)
  function telDeCliente(nombre) {
    const c = clientes.find(x => x.nombre.toLowerCase() === (nombre||"").toLowerCase());
    if (c && c.telefono) return c.telefono;
    const t = turnos.find(x => x.cliente.toLowerCase() === (nombre||"").toLowerCase() && x.telefono);
    return t ? t.telefono : "";
  }
  // Historial de servicios (cortes) de un cliente por nombre
  function serviciosDeCliente(nombre) {
    return cortes.filter(c => c.cliente.toLowerCase() === (nombre||"").toLowerCase());
  }
  // Precargar agendar turno con un cliente
  function agendarParaCliente(nombre, telefono) {
    setTurnoForm(f => ({ ...f, cliente: nombre, telefono: telefono || telDeCliente(nombre) }));
    setVista("turnos");
    setToast("Cargá la fecha y hora del turno");
  }
  // Precargar un turno en la pestaña Corte
  function turnoACorte(t) {
    setForm(f => ({ ...f, cliente: t.cliente, telefono: t.telefono || "", barbero: t.barbero, servicio: t.barba ? "Corte y Barba" : "Corte" }));
    setVista("registrar");
    setToast("Datos precargados en Servicio");
  }

  // ── MEMBRESÍAS ──
  function handleVenderPase() {
    const e = {};
    if (!paseForm.cliente.trim()) e.cliente = true;
    if (!paseForm.telefono.trim()) e.telefono = true;
    if (!paseForm.barbero) e.barbero = true;
    if (!paseForm.tipo) e.tipo = true;
    if (!paseForm.medioPago) e.medioPago = true;
    if (!paseForm.monto || isNaN(Number(paseForm.monto)) || Number(paseForm.monto) <= 0) e.monto = true;
    if (Object.keys(e).length) { setPaseErrors(e); return; }
    const fechaCompra = new Date().toISOString();
    setPases(prev => [{
      id: Date.now(), cliente: paseForm.cliente.trim(), barbero: paseForm.barbero,
      tipo: paseForm.tipo, fechaCompra,
      vence: addDias(fechaCompra, PASE_CONFIG[paseForm.tipo].dias),
      monto: Number(paseForm.monto), medioPago: paseForm.medioPago,
      visitas: [], cuotas: generarCuotas(paseForm.tipo, fechaCompra),
    }, ...prev]);
    guardarCliente(paseForm.cliente, paseForm.telefono);
    setPaseForm(initialPaseForm); setPaseErrors({});
    setToast("Membresía vendida");
  }
  function handleDeletePase(id) {
    setPases(prev => prev.filter(p => p.id !== id));
    setConfirmDeletePase(null); setPaseDetalle(null); setToast("Membresía eliminada");
  }
  function handleRegistrarVisita(paseId) {
    const pase = pases.find(p => p.id === paseId);
    const barbero = visitaBarbero[paseId] || pase?.barbero;
    if (!barbero) { setToast("Elegí el barbero que atendió"); return; }
    const propina = Number(visitaPropina[paseId]) || 0;
    const medio = propina > 0 ? (visitaMedio[paseId] || "Efectivo") : null;
    setPases(prev => prev.map(p => p.id === paseId
      ? { ...p, visitas: [...p.visitas, { fecha: new Date().toISOString(), barbero, propina, medioPropina: medio }] }
      : p));
    setVisitaPropina(v => ({ ...v, [paseId]: "" }));
    setToast("Visita registrada");
  }
  function handlePagarCuota() {
    if (!cuotaPago) return;
    const monto = Number(cuotaMonto);
    if (!monto || monto <= 0) { setToast("Ingresá un monto válido"); return; }
    if (!cuotaMedio) { setToast("Elegí el medio de pago"); return; }
    const pase = pases.find(p => p.id === cuotaPago.paseId);
    // registrar pago al barbero
    setPagos(prev => [{
      id: Date.now(), fecha: new Date().toISOString(),
      barbero: pase.barbero, monto, medioPago: cuotaMedio,
      nota: `Cuota ${cuotaPago.n} · ${pase.tipo} · ${pase.cliente}`,
      tipo: "membresia", paseId: cuotaPago.paseId, cuotaN: cuotaPago.n,
    }, ...prev]);
    // actualizar cuota
    setPases(prev => prev.map(p => p.id === cuotaPago.paseId
      ? { ...p, cuotas: p.cuotas.map(c => c.n === cuotaPago.n ? { ...c, pagado: c.pagado + monto } : c) }
      : p));
    setCuotaPago(null); setCuotaMonto(""); setCuotaMedio("");
    setToast("Cuota pagada");
  }

  // ── COMISIONES por barbero (cortes + membresías) ──
  function propinasVisitasBarbero(b) {
    let total = 0;
    pases.forEach(p => p.visitas.forEach(v => { if (v.barbero === b) total += (v.propina || 0); }));
    return total;
  }
  function comisionCortesBarbero(b) {
    const totalC = cortes.filter(c => c.barbero === b).reduce((a, c) => a + (c.comision || 0), 0);
    const propVis = propinasVisitasBarbero(b);
    const pagadoC = pagos.filter(p => p.barbero === b && p.tipo === "corte").reduce((a, p) => a + p.monto, 0);
    const total = totalC + propVis;
    return { total, pagado: pagadoC, pendiente: total - pagadoC };
  }
  function cuotasBarbero(b) {
    // todas las cuotas de pases cuyo titular es b
    const lista = [];
    pases.filter(p => p.barbero === b).forEach(p => {
      p.cuotas.forEach(c => lista.push({ ...c, paseId: p.id, cliente: p.cliente, tipo: p.tipo }));
    });
    return lista;
  }
  function comisionMembresiaBarbero(b) {
    const cuotas = cuotasBarbero(b);
    const today = new Date().toISOString();
    let vencidoPendiente = 0, totalPendiente = 0;
    cuotas.forEach(c => {
      const rest = c.monto - c.pagado;
      if (rest > 0) {
        totalPendiente += rest;
        if (c.vence <= today) vencidoPendiente += rest;
      }
    });
    return { totalPendiente, vencidoPendiente, cuotas };
  }

  // ── SALDOS ──
  function calcularSaldos() {
    let efectivo = CAJA_INICIAL_EFECTIVO, mp = CAJA_INICIAL_MP, iibbTotal = 0;
    cortes.forEach(c => {
      const bruto = c.monto + c.propina, neto = netoIngreso(c.medioPago, bruto);
      if (billetera(c.medioPago) === "Efectivo") efectivo += neto; else mp += neto;
      iibbTotal += iibbDe(c.medioPago, bruto);
    });
    pases.forEach(p => {
      const neto = netoIngreso(p.medioPago, p.monto);
      if (billetera(p.medioPago) === "Efectivo") efectivo += neto; else mp += neto;
      iibbTotal += iibbDe(p.medioPago, p.monto);
      p.visitas.forEach(v => {
        if (v.propina > 0) { if (billetera(v.medioPropina) === "Efectivo") efectivo += v.propina; else mp += v.propina; }
      });
    });
    pagos.forEach(p => {
      if (billetera(p.medioPago) === "Efectivo") efectivo -= p.monto; else mp -= p.monto;
    });
    gastos.forEach(g => {
      if (billetera(g.medioPago) === "Efectivo") efectivo -= g.monto; else mp -= g.monto;
    });
    return { efectivo, mp, iibbTotal, total: efectivo + mp };
  }
  const saldos = calcularSaldos();

  function movimientosDia(fecha) {
    let entraEfec=0, entraMP=0, saleEfec=0, saleMP=0, iibbDia=0;
    cortes.filter(c=>c.fecha.slice(0,10)===fecha).forEach(c=>{
      const bruto=c.monto+c.propina, neto=netoIngreso(c.medioPago,bruto);
      if(billetera(c.medioPago)==="Efectivo") entraEfec+=neto; else entraMP+=neto;
      iibbDia+=iibbDe(c.medioPago,bruto);
    });
    pases.filter(p=>p.fechaCompra.slice(0,10)===fecha).forEach(p=>{
      const neto=netoIngreso(p.medioPago,p.monto);
      if(billetera(p.medioPago)==="Efectivo") entraEfec+=neto; else entraMP+=neto;
      iibbDia+=iibbDe(p.medioPago,p.monto);
    });
    pases.forEach(p=>p.visitas.filter(v=>v.fecha.slice(0,10)===fecha&&v.propina>0).forEach(v=>{
      if(billetera(v.medioPropina)==="Efectivo") entraEfec+=v.propina; else entraMP+=v.propina;
    }));
    pagos.filter(p=>p.fecha.slice(0,10)===fecha).forEach(p=>{ if(billetera(p.medioPago)==="Efectivo") saleEfec+=p.monto; else saleMP+=p.monto; });
    gastos.filter(g=>g.fecha.slice(0,10)===fecha).forEach(g=>{ if(billetera(g.medioPago)==="Efectivo") saleEfec+=g.monto; else saleMP+=g.monto; });
    return { entraEfec, entraMP, saleEfec, saleMP, iibbDia };
  }
  const movHoy = movimientosDia(hoy());

  // ── Historial cortes ──
  const cortesHistorial = cortes.filter(c => {
    const f = c.fecha.slice(0, 10);
    return modoFiltro === "dia" ? f === filtroDia : f >= filtroDesde && f <= filtroHasta;
  });
  const totalH = cortesHistorial.reduce((a,c)=>a+c.monto+c.propina,0);
  const totalPropinasH = cortesHistorial.reduce((a,c)=>a+c.propina,0);
  const totalServiciosH = cortesHistorial.reduce((a,c)=>a+c.monto,0);
  const porBarberoH = BARBEROS.map(b => {
    const cc = cortesHistorial.filter(c => c.barbero === b);
    return { barbero:b, cantidad:cc.length, total:cc.reduce((a,c)=>a+c.monto,0), propinas:cc.reduce((a,c)=>a+c.propina,0), comisiones:cc.reduce((a,c)=>a+(c.comision||0),0) };
  }).filter(b => b.cantidad > 0);
  const labelFiltro = modoFiltro==="dia"
    ? (filtroDia===hoy()?"Hoy":formatFecha(filtroDia+"T12:00:00"))
    : `${formatFecha(filtroDesde+"T12:00:00")} → ${formatFecha(filtroHasta+"T12:00:00")}`;

  function enRango(iso) {
    const f = iso.slice(0,10);
    return modoFiltro === "dia" ? f === filtroDia : f >= filtroDesde && f <= filtroHasta;
  }
  // Movimientos unificados: cortes, ventas de pases, pagos a barberos
  const movimientos = [
    ...cortes.filter(c=>enRango(c.fecha)).map(c=>({ tipo:"corte", fecha:c.fecha, id:"c"+c.id, data:c })),
    ...pases.filter(p=>enRango(p.fechaCompra)).map(p=>({ tipo:"pase", fecha:p.fechaCompra, id:"v"+p.id, data:p })),
    ...pagos.filter(p=>enRango(p.fecha)).map(p=>({ tipo:"pago", fecha:p.fecha, id:"p"+p.id, data:p })),
    ...gastos.filter(g=>enRango(g.fecha)).map(g=>({ tipo:"gasto", fecha:g.fecha, id:"g"+g.id, data:g })),
  ].sort((a,b)=>b.fecha.localeCompare(a.fecha));

  function handleGuardarCierre() {
    const cEf = contadoEfectivo==="" ? null : Number(contadoEfectivo);
    const cMp = contadoMP==="" ? null : Number(contadoMP);
    if (cEf===null && cMp===null) { setToast("Ingresá al menos un conteo"); return; }
    setCierres(prev => [{ id:Date.now(), fecha:new Date().toISOString(), esperadoEfectivo:saldos.efectivo, esperadoMP:saldos.mp, contadoEfectivo:cEf, contadoMP:cMp }, ...prev]);
    setContadoEfectivo(""); setContadoMP(""); setToast("Cierre guardado");
  }
  function handleAgregarGasto() {
    const m = Number(gastoForm.monto);
    if (!m || m<=0) { setToast("Ingresá un monto válido"); return; }
    if (!gastoForm.desc.trim()) { setToast("Poné una descripción"); return; }
    if (!gastoForm.medioPago) { setToast("Elegí de dónde sale"); return; }
    setGastos(prev => [{ id:Date.now(), fecha:new Date().toISOString(), monto:m, desc:gastoForm.desc.trim(), medioPago:gastoForm.medioPago }, ...prev]);
    setGastoForm({ monto:"", desc:"", medioPago:"" });
    setToast("Gasto registrado");
  }
  function handleDeleteGasto(id) { setGastos(prev => prev.filter(g => g.id !== id)); setConfirmDeleteGasto(null); setToast("Gasto eliminado"); }

  // ── styles ──
  const sInp = (err) => ({ width:"100%", padding:"10px 12px", borderRadius:8, border:`1.5px solid ${err?"#e05c5c":"#2a2a2a"}`, background:"#181818", color:"#f0ede6", fontSize:15, outline:"none", boxSizing:"border-box", fontFamily:"inherit" });
  const Sel = ({ field, options, placeholder, value, onChange, errs }) => (
    <select value={value} onChange={onChange} style={{ ...sInp((errs||{})[field]), color: value?"#f0ede6":"#666", appearance:"none" }}>
      <option value="">{placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
  const Modal = ({ title, body, onCancel, onConfirm, confirmLabel="Eliminar" }) => (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:998,display:"flex",alignItems:"center",justifyContent:"center",padding:20 }}>
      <div style={{ background:"#1a1a1a",borderRadius:16,padding:24,maxWidth:320,width:"100%",border:"1px solid #2a2a2a" }}>
        <div style={{ fontWeight:700,marginBottom:8 }}>{title}</div>
        <div style={{ color:"#aaa",fontSize:13,marginBottom:20 }}>{body}</div>
        <div style={{ display:"flex",gap:10 }}>
          <button onClick={onCancel} style={{ flex:1,padding:"9px 0",borderRadius:8,border:"1px solid #333",background:"transparent",color:"#aaa",cursor:"pointer",fontSize:14 }}>Cancelar</button>
          <button onClick={onConfirm} style={{ flex:1,padding:"9px 0",borderRadius:8,border:"none",background:"#e05c5c",color:"#fff",cursor:"pointer",fontSize:14,fontWeight:700 }}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );

  const pendCount = pendientes.length;
  // Estructura de módulos (admin). Cada submódulo apunta a una "vista".
  const MODULOS = esAdmin ? [
    { id:"in",   label:"Inicio",              subs:[ {v:"inicio",label:"Inicio"} ] },
    { id:"ts",   label:"Turnos & Servicios",  subs:[ {v:"turnos",label:"Turnos"}, {v:"registrar",label:"Servicios"} ] },
    { id:"cp",   label:"Clientes & Membresías", subs:[ {v:"clientes",label:"Clientes"}, {v:"membresias",label:"Membresías"} ] },
    { id:"cc",   label:"Caja & Cierres",      subs:[ {v:"caja",label:"Cierre de caja"}, {v:"comisiones",label:"Pago a barberos"}, {v:"historial",label:"Historial"}, {v:"score",label:"Score"} ] },
  ] : [
    { id:"mp",   label:"Mi panel", subs:[ {v:"barbero",label:"Resumen"}, {v:"bcargar",label:"Cargar"}, {v:"bscore",label:"Mi Score"}, {v:"bhistorial",label:"Historial"}, {v:"misclientes",label:"Clientes y membresías"} ] },
    { id:"ts",   label:"Turnos",   subs:[ {v:"turnos",label:"Turnos"} ] },
  ];
  const moduloDe = v => MODULOS.find(m => m.subs.some(s => s.v === v)) || MODULOS[0];
  const moduloActivo = moduloDe(vista);

  // ── LOGIN ──
  if (!sesion) {
    return (
      <div style={{ minHeight:"100vh",background:"#0f0f0f",color:"#f0ede6",fontFamily:"'Segoe UI',system-ui,sans-serif",display:"flex",alignItems:"center",justifyContent:"center",padding:20 }}>
        <div style={{ width:"100%",maxWidth:340 }}>
          <div style={{ textAlign:"center",marginBottom:28 }}>
            <img src={LOGO} alt="PDC" style={{ height:90,width:"auto",margin:"0 auto 12px",display:"block" }} />
            <div style={{ fontSize:24,fontWeight:700,letterSpacing:2,color:"#f2efe8" }}>PDC BARBERÍA</div>
            <div style={{ fontSize:11,color:"#666",letterSpacing:1.5,marginTop:4,textTransform:"uppercase" }}>1 Reyes 8:29</div>
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
            <select value={loginUser} onChange={e=>{setLoginUser(e.target.value);setLoginError("");}} style={{ ...sInp(false),color:loginUser?"#f0ede6":"#666",appearance:"none" }}>
              <option value="">¿Quién sos?</option>
              {Object.keys(USUARIOS).map(u=><option key={u} value={u}>{u}</option>)}
            </select>
            <input type="password" placeholder="Clave" value={loginClave} onChange={e=>{setLoginClave(e.target.value);setLoginError("");}}
              onKeyDown={e=>{ if(e.key==="Enter") handleLogin(); }} style={sInp(false)} />
            {loginError && <div style={{ color:"#e05c5c",fontSize:13,textAlign:"center" }}>{loginError}</div>}
            <button onClick={handleLogin} style={{ padding:"13px 0",borderRadius:10,border:"none",background:"#f2efe8",color:"#0f0f0f",fontWeight:800,fontSize:16,cursor:"pointer" }}>Ingresar</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight:"100vh",background:"#0f0f0f",color:"#f0ede6",fontFamily:"'Segoe UI',system-ui,sans-serif",paddingBottom:60 }}>
      <div style={{ background:"#141414",borderBottom:"1px solid #232323",padding:"18px 20px 0" }}>
        <div style={{ maxWidth:520,margin:"0 auto" }}>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:2 }}>
            <div style={{ display:"flex",alignItems:"center",gap:10 }}>
              <img src={LOGO} alt="PDC" style={{ height:34,width:"auto",display:"block" }} /><span style={{ fontSize:20,fontWeight:700,letterSpacing:1,color:"#f2efe8" }}>PDC BARBERÍA</span>
            </div>
            <button onClick={handleLogout} style={{ background:"transparent",border:"1px solid #2a2a2a",borderRadius:8,padding:"5px 10px",color:"#888",fontSize:11,cursor:"pointer" }}>Salir</button>
          </div>
          <div style={{ fontSize:11,color:"#666",letterSpacing:1.5,marginBottom:14,textTransform:"uppercase" }}>{esAdmin?"Administración · "+ADMIN_NOMBRE.split(" ")[0]:sesion.usuario.split(" ")[0]}</div>
          {/* Módulos */}
          <div style={{ display:"flex",gap:0,borderBottom:"1px solid #232323",overflowX:"auto" }}>
            {MODULOS.map(m => {
              const activo = moduloActivo.id === m.id;
              return (
                <button key={m.id} onClick={()=>{ setVista(m.subs[0].v); setBarberoDetalle(null); setPaseDetalle(null); }} style={{ flex:"1 0 auto",padding:"9px 12px",border:"none",cursor:"pointer",fontSize:12,fontWeight:700,background:"transparent",color:activo?"#f2efe8":"#666",borderBottom:activo?"2px solid #f2efe8":"2px solid transparent",marginBottom:-1,whiteSpace:"nowrap" }}>{m.label}</button>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:520,margin:"0 auto",padding:"0 16px" }}>
        {/* Submódulos (solo si el módulo tiene más de uno) */}
        {moduloActivo.subs.length > 1 && (
          <div style={{ display:"flex",gap:8,paddingTop:16,flexWrap:"wrap" }}>
            {moduloActivo.subs.map(s => (
              <button key={s.v} onClick={()=>{ setVista(s.v); setBarberoDetalle(null); setPaseDetalle(null); }} style={{ padding:"7px 16px",borderRadius:20,border:"none",cursor:"pointer",fontSize:13,fontWeight:600,background:vista===s.v?"#f2efe8":"#1e1e1e",color:vista===s.v?"#0f0f0f":"#aaa" }}>{s.label}</button>
            ))}
          </div>
        )}
        {toast && <div style={{ position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",background:"#f2efe8",color:"#0f0f0f",padding:"10px 24px",borderRadius:20,fontWeight:700,fontSize:14,zIndex:999,boxShadow:"0 4px 20px rgba(0,0,0,0.4)" }}>{toast}</div>}
        {confirmDelete && <Modal title="¿Eliminar este corte?" body="Afecta los saldos acumulados de caja." onCancel={()=>setConfirmDelete(null)} onConfirm={()=>handleDelete(confirmDelete)} />}
        {confirmDeletePago && <Modal title="¿Eliminar este pago?" body="El monto vuelve a sumarse al saldo de la billetera y al pendiente del barbero." onCancel={()=>setConfirmDeletePago(null)} onConfirm={()=>handleDeletePago(confirmDeletePago)} />}
        {confirmDeleteCierre && <Modal title="¿Eliminar este cierre?" body="Solo borra el registro de comparación." onCancel={()=>setConfirmDeleteCierre(null)} onConfirm={()=>handleDeleteCierre(confirmDeleteCierre)} />}
        {confirmDeleteScore && <Modal title="¿Eliminar este punto?" body="Se descuenta del score de esa persona." onCancel={()=>setConfirmDeleteScore(null)} onConfirm={()=>handleDeleteScore(confirmDeleteScore)} />}
        {confirmDeleteTurno && <Modal title="¿Eliminar este turno?" body="Se quita de la agenda." onCancel={()=>setConfirmDeleteTurno(null)} onConfirm={()=>handleDeleteTurno(confirmDeleteTurno)} />}
        {confirmDeleteGasto && <Modal title="¿Eliminar este gasto?" body="Se devuelve el monto a la caja." onCancel={()=>setConfirmDeleteGasto(null)} onConfirm={()=>handleDeleteGasto(confirmDeleteGasto)} />}
        {confirmLogro && (
          <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:998,display:"flex",alignItems:"center",justifyContent:"center",padding:20 }}>
            <div style={{ background:"#1a1a1a",borderRadius:16,padding:24,maxWidth:320,width:"100%",border:"1px solid #2a2a2a" }}>
              <div style={{ fontWeight:700,marginBottom:8 }}>¿Sumar este logro?</div>
              <div style={{ color:"#aaa",fontSize:13,marginBottom:20 }}>⭐ {confirmLogro.t} · +{confirmLogro.pts} pto{confirmLogro.pts!==1?"s":""}{confirmLogro.unica?" · única vez (no se podrá volver a sumar)":""}</div>
              <div style={{ display:"flex",gap:10 }}>
                <button onClick={()=>setConfirmLogro(null)} style={{ flex:1,padding:"9px 0",borderRadius:8,border:"1px solid #333",background:"transparent",color:"#aaa",cursor:"pointer",fontSize:14 }}>Cancelar</button>
                <button onClick={()=>{ sumarLogro("Recepción / Admin",confirmLogro); setConfirmLogro(null); }} style={{ flex:1,padding:"9px 0",borderRadius:8,border:"none",background:"#7ec87e",color:"#0f0f0f",cursor:"pointer",fontSize:14,fontWeight:700 }}>Sumar</button>
              </div>
            </div>
          </div>
        )}
        {confirmSolicitud && (
          <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:998,display:"flex",alignItems:"center",justifyContent:"center",padding:20 }}>
            <div style={{ background:"#1a1a1a",borderRadius:16,padding:24,maxWidth:320,width:"100%",border:"1px solid #2a2a2a" }}>
              <div style={{ fontWeight:700,marginBottom:8 }}>¿Solicitar este logro?</div>
              <div style={{ color:"#aaa",fontSize:13,marginBottom:20 }}>⭐ {confirmSolicitud.t} · +{confirmSolicitud.pts} pto{confirmSolicitud.pts!==1?"s":""}. Lo aprueba {ADMIN_NOMBRE.split(" ")[0]}.</div>
              <div style={{ display:"flex",gap:10 }}>
                <button onClick={()=>setConfirmSolicitud(null)} style={{ flex:1,padding:"9px 0",borderRadius:8,border:"1px solid #333",background:"transparent",color:"#aaa",cursor:"pointer",fontSize:14 }}>Cancelar</button>
                <button onClick={()=>{ solicitarPunto({ persona:barberoActivo, categoria:confirmSolicitud.t, nota:"", puntos:confirmSolicitud.pts }); setConfirmSolicitud(null); }} style={{ flex:1,padding:"9px 0",borderRadius:8,border:"none",background:"#7ec87e",color:"#0f0f0f",cursor:"pointer",fontSize:14,fontWeight:700 }}>Solicitar</button>
              </div>
            </div>
          </div>
        )}
        {confirmDeletePase && <Modal title="¿Eliminar esta membresía?" body="Se borran sus visitas y cuotas. Afecta los saldos." onCancel={()=>setConfirmDeletePase(null)} onConfirm={()=>handleDeletePase(confirmDeletePase)} />}
        {cuotaPago && (
          <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:998,display:"flex",alignItems:"center",justifyContent:"center",padding:20 }}>
            <div style={{ background:"#1a1a1a",borderRadius:16,padding:24,maxWidth:320,width:"100%",border:"1px solid #2a2a2a" }}>
              <div style={{ fontWeight:700,marginBottom:4 }}>Pagar cuota {cuotaPago.n}</div>
              <div style={{ color:"#888",fontSize:13,marginBottom:16 }}>Restante: {fmt(cuotaPago.restante)}. Podés pagar parcial o total.</div>
              <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                <input type="number" placeholder="Monto a pagar" value={cuotaMonto} onChange={e=>setCuotaMonto(e.target.value)} style={sInp(false)} />
                <select value={cuotaMedio} onChange={e=>setCuotaMedio(e.target.value)} style={{ ...sInp(false), color:cuotaMedio?"#f0ede6":"#666", appearance:"none" }}>
                  <option value="">Medio de pago</option>
                  {MEDIOS_PAGO_BARBERO.map(m=><option key={m} value={m}>{m}</option>)}
                </select>
                <button onClick={()=>setCuotaMonto(String(cuotaPago.restante))} style={{ background:"transparent",border:"1px solid #333",borderRadius:8,padding:"8px 0",color:"#aaa",fontSize:13,cursor:"pointer" }}>Pagar total ({fmt(cuotaPago.restante)})</button>
                <div style={{ display:"flex",gap:10,marginTop:4 }}>
                  <button onClick={()=>{setCuotaPago(null);setCuotaMonto("");setCuotaMedio("");}} style={{ flex:1,padding:"10px 0",borderRadius:8,border:"1px solid #333",background:"transparent",color:"#aaa",cursor:"pointer" }}>Cancelar</button>
                  <button onClick={handlePagarCuota} style={{ flex:1,padding:"10px 0",borderRadius:8,border:"none",background:"#7ec87e",color:"#0f0f0f",fontWeight:700,cursor:"pointer" }}>Confirmar</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── REGISTRAR ── */}
        {vista === "registrar" && (
          <div style={{ paddingTop:24 }}>
            <div style={{ fontSize:16,fontWeight:700,marginBottom:18,color:"#f2efe8" }}>Cargar servicio</div>
            <div style={{ fontSize:11,color:"#666",marginBottom:14 }}>Las membresías se venden en Clientes & Pases.</div>
            <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
              <Sel field="servicio" options={SERVICIOS} placeholder="Tipo de servicio" value={form.servicio} errs={errors} onChange={e=>{setForm(f=>({...f,servicio:e.target.value}));setErrors(er=>({...er,servicio:false}));}} />
              <ClienteInput value={form.cliente} clientes={clientes} err={errors.cliente} sInp={sInp}
                onChange={v=>{setForm(f=>({...f,cliente:v}));setErrors(er=>({...er,cliente:false}));}}
                onPick={c=>setForm(f=>({...f,cliente:c.nombre,telefono:c.telefono||f.telefono}))} />
              <input type="tel" placeholder="Teléfono (opcional)" value={form.telefono} style={sInp(false)} onChange={e=>setForm(f=>({...f,telefono:e.target.value}))} />
              <Sel field="barbero" options={BARBEROS} placeholder="Barbero" value={form.barbero} errs={errors} onChange={e=>{setForm(f=>({...f,barbero:e.target.value}));setErrors(er=>({...er,barbero:false}));}} />
              <Sel field="medioPago" options={MEDIOS_PAGO} placeholder="Medio de pago" value={form.medioPago} errs={errors} onChange={e=>{setForm(f=>({...f,medioPago:e.target.value}));setErrors(er=>({...er,medioPago:false}));}} />
              <div style={{ display:"flex",gap:10 }}>
                <input placeholder="Monto ($)" type="number" value={form.monto} style={{...sInp(errors.monto),flex:1}} onChange={e=>{setForm(f=>({...f,monto:e.target.value}));setErrors(er=>({...er,monto:false}));}} />
                <input placeholder="Propina (opcional)" type="number" value={form.propina} style={{...sInp(false),flex:1}} onChange={e=>setForm(f=>({...f,propina:e.target.value}))} />
              </div>
              {(form.servicio==="Corte"||form.servicio==="Corte y Barba") && (
                <div style={{ background:"#181818",border:"1px solid #2a2a2a",borderRadius:8,padding:"10px 12px",fontSize:13,color:"#aaa",display:"flex",justifyContent:"space-between" }}>
                  <span>Comisión del barbero</span><span style={{ color:"#f2efe8",fontWeight:700 }}>{fmt(comisionBarbero(form.servicio,form.propina?Number(form.propina):0))}</span>
                </div>
              )}
              {tieneIIBB(form.medioPago) && form.monto && (
                <div style={{ background:"#181818",border:"1px solid #2a2a2a",borderRadius:8,padding:"10px 12px",fontSize:12,color:"#888",display:"flex",justifyContent:"space-between" }}>
                  <span>IIBB 3%</span><span style={{ color:"#b09a78" }}>neto {fmt(netoIngreso(form.medioPago,Number(form.monto)+(form.propina?Number(form.propina):0)))}</span>
                </div>
              )}
              <button onClick={handleSubmit} style={{ padding:"13px 0",borderRadius:10,border:"none",background:"#f2efe8",color:"#0f0f0f",fontWeight:800,fontSize:16,cursor:"pointer",marginTop:4 }}>Registrar corte</button>
              {Object.values(errors).some(Boolean) && <div style={{ color:"#e05c5c",fontSize:13,textAlign:"center" }}>Completá todos los campos obligatorios.</div>}
            </div>
          </div>
        )}

        {/* ── HISTORIAL ── */}
        {vista === "historial" && (
          <div style={{ paddingTop:24 }}>
            <div style={{ fontSize:16,fontWeight:700,marginBottom:16,color:"#f2efe8" }}>Historial</div>
            <div style={{ display:"flex",background:"#181818",borderRadius:8,padding:3,marginBottom:14,border:"1px solid #232323" }}>
              {[{id:"dia",label:"Un día"},{id:"lapso",label:"Período"}].map(m=>(
                <button key={m.id} onClick={()=>setModoFiltro(m.id)} style={{ flex:1,padding:"7px 0",borderRadius:6,border:"none",cursor:"pointer",fontSize:13,fontWeight:600,background:modoFiltro===m.id?"#f2efe8":"transparent",color:modoFiltro===m.id?"#0f0f0f":"#666" }}>{m.label}</button>
              ))}
            </div>
            {modoFiltro==="dia" ? (
              <div style={{ marginBottom:18 }}><input type="date" value={filtroDia} onChange={e=>setFiltroDia(e.target.value)} style={{...sInp(false),width:"auto"}} /></div>
            ) : (
              <div style={{ display:"flex",gap:8,alignItems:"center",marginBottom:18,flexWrap:"wrap" }}>
                <input type="date" value={filtroDesde} onChange={e=>setFiltroDesde(e.target.value)} style={{...sInp(false),flex:1,minWidth:130}} />
                <span style={{ color:"#666",fontSize:13 }}>hasta</span>
                <input type="date" value={filtroHasta} onChange={e=>setFiltroHasta(e.target.value)} style={{...sInp(false),flex:1,minWidth:130}} />
              </div>
            )}
            <div style={{ background:"#141414",borderRadius:12,padding:16,marginBottom:20,border:"1px solid #232323" }}>
              <div style={{ fontSize:12,color:"#888",marginBottom:10,textTransform:"uppercase",letterSpacing:1 }}>Resumen · {labelFiltro}</div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14 }}>
                {[["Cortes",cortesHistorial.length,"#f2efe8",22],["Servicios",fmt(totalServiciosH),"#f0ede6",16],["Propinas",fmt(totalPropinasH),"#7ec87e",16]].map(([l,v,col,fs])=>(
                  <div key={l} style={{ background:"#1a1a1a",borderRadius:8,padding:"10px 12px" }}><div style={{ fontSize:11,color:"#888",marginBottom:3 }}>{l}</div><div style={{ fontSize:fs,fontWeight:800,color:col }}>{v}</div></div>
                ))}
              </div>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px solid #232323",paddingTop:10 }}>
                <span style={{ fontSize:13,color:"#aaa" }}>Total del período</span><span style={{ fontSize:20,fontWeight:800,color:"#f2efe8" }}>{fmt(totalH)}</span>
              </div>
            </div>
            {porBarberoH.length>0&&(
              <div style={{ marginBottom:20 }}>
                <div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"uppercase",letterSpacing:1 }}>Por barbero</div>
                {porBarberoH.map(b=>(
                  <div key={b.barbero} style={{ background:"#141414",borderRadius:10,padding:"12px 14px",border:"1px solid #1e1e1e",marginBottom:8 }}>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                      <div><div style={{ fontWeight:600,fontSize:14 }}>{b.barbero.split(" ")[0]}</div><div style={{ fontSize:12,color:"#888" }}>{b.cantidad} corte{b.cantidad!==1?"s":""} · propinas {fmt(b.propinas)}</div></div>
                      <div style={{ textAlign:"right" }}><div style={{ fontSize:17,fontWeight:800,color:"#f2efe8" }}>{fmt(b.total)}</div><div style={{ fontSize:11,color:"#b09a78" }}>comisión {fmt(b.comisiones)}</div></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"uppercase",letterSpacing:1 }}>Movimientos</div>
            {movimientos.length===0
              ? <div style={{ textAlign:"center",color:"#555",padding:"40px 0",fontSize:14 }}>No hay movimientos para este período.</div>
              : movimientos.map(m=>{
                const cuando = modoFiltro==="lapso"?formatFecha(m.fecha)+" · "+formatHora(m.fecha):formatHora(m.fecha);
                if (m.tipo==="corte") { const c=m.data; return (
                  <div key={m.id} style={{ background:"#141414",borderRadius:12,padding:14,border:"1px solid #1e1e1e",marginBottom:10 }}>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4 }}><span style={{ fontWeight:700,fontSize:15 }}>{c.cliente}</span><span style={{ fontSize:11,background:"#232323",color:"#aaa",borderRadius:4,padding:"1px 7px" }}>{c.servicio}</span></div>
                        <div style={{ fontSize:12,color:"#888",display:"flex",gap:10,flexWrap:"wrap" }}><span>✂️ {c.barbero.split(" ")[0]}</span><span>💳 {c.medioPago}</span><span>🕐 {cuando}</span></div>
                      </div>
                      <div style={{ textAlign:"right",marginLeft:10 }}><div style={{ fontWeight:800,fontSize:16,color:"#f2efe8" }}>{fmt(c.monto)}</div>{c.propina>0&&<div style={{ fontSize:12,color:"#7ec87e" }}>+{fmt(c.propina)} propina</div>}{tieneIIBB(c.medioPago)&&<div style={{ fontSize:11,color:"#b09a78" }}>neto {fmt(netoIngreso(c.medioPago,c.monto+c.propina))}</div>}</div>
                    </div>
                    <button onClick={()=>setConfirmDelete(c.id)} style={{ marginTop:10,background:"transparent",border:"none",color:"#555",fontSize:12,cursor:"pointer",padding:0 }}>🗑 Eliminar</button>
                  </div>
                ); }
                if (m.tipo==="pase") { const p=m.data; return (
                  <div key={m.id} style={{ background:"#141414",borderRadius:12,padding:14,border:"1px solid #1e2630",marginBottom:10 }}>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4 }}><span style={{ fontWeight:700,fontSize:15 }}>{p.cliente}</span><span style={{ fontSize:11,background:"#16242e",color:"#5a9fd4",borderRadius:4,padding:"1px 7px" }}>Venta de membresía</span></div>
                        <div style={{ fontSize:12,color:"#888",display:"flex",gap:10,flexWrap:"wrap" }}><span>🎫 {p.tipo}</span><span>💳 {p.medioPago}</span><span>🕐 {cuando}</span></div>
                      </div>
                      <div style={{ textAlign:"right",marginLeft:10 }}><div style={{ fontWeight:800,fontSize:16,color:"#5a9fd4" }}>{fmt(p.monto)}</div>{tieneIIBB(p.medioPago)&&<div style={{ fontSize:11,color:"#b09a78" }}>neto {fmt(netoIngreso(p.medioPago,p.monto))}</div>}</div>
                    </div>
                  </div>
                ); }
                if (m.tipo==="gasto") { const g=m.data; return (
                  <div key={m.id} style={{ background:"#141414",borderRadius:12,padding:14,border:"1px solid #2a1e1e",marginBottom:10 }}>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4 }}><span style={{ fontWeight:700,fontSize:15 }}>{g.desc}</span><span style={{ fontSize:11,background:"#2a1e1e",color:"#e0846a",borderRadius:4,padding:"1px 7px" }}>Gasto</span></div>
                        <div style={{ fontSize:12,color:"#888",display:"flex",gap:10,flexWrap:"wrap" }}><span>💳 {g.medioPago}</span><span>🕐 {cuando}</span></div>
                      </div>
                      <div style={{ textAlign:"right",marginLeft:10 }}><div style={{ fontWeight:800,fontSize:16,color:"#e0846a" }}>−{fmt(g.monto)}</div></div>
                    </div>
                    <button onClick={()=>setConfirmDeleteGasto(g.id)} style={{ marginTop:10,background:"transparent",border:"none",color:"#555",fontSize:12,cursor:"pointer",padding:0 }}>🗑 Eliminar</button>
                  </div>
                ); }
                const p=m.data; return (
                  <div key={m.id} style={{ background:"#141414",borderRadius:12,padding:14,border:"1px solid #2a1e1e",marginBottom:10 }}>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4 }}><span style={{ fontWeight:700,fontSize:15 }}>{p.barbero.split(" ")[0]}</span><span style={{ fontSize:11,background:"#2a1e1e",color:"#e0846a",borderRadius:4,padding:"1px 7px" }}>Pago {p.tipo==="membresia"?"membresía":"cortes"}</span></div>
                        <div style={{ fontSize:12,color:"#888",display:"flex",gap:10,flexWrap:"wrap" }}><span>💳 {p.medioPago}</span><span>🕐 {cuando}</span>{p.nota&&<span>📝 {p.nota}</span>}</div>
                      </div>
                      <div style={{ textAlign:"right",marginLeft:10 }}><div style={{ fontWeight:800,fontSize:16,color:"#e0846a" }}>−{fmt(p.monto)}</div></div>
                    </div>
                    <button onClick={()=>setConfirmDeletePago(p.id)} style={{ marginTop:10,background:"transparent",border:"none",color:"#555",fontSize:12,cursor:"pointer",padding:0 }}>🗑 Eliminar</button>
                  </div>
                );
              })
            }
          </div>
        )}

        {/* ── MEMBRESÍAS (lista) ── */}
        {vista === "membresias" && !paseDetalle && (
          <div style={{ paddingTop:24 }}>
            <div style={{ fontSize:16,fontWeight:700,marginBottom:4,color:"#f2efe8" }}>Membresías</div>
            <div style={{ fontSize:12,color:"#666",marginBottom:20 }}>Membresías activas y vencidas</div>

            {/* Vender membresía */}
            <div style={{ background:"#141414",borderRadius:12,padding:16,marginBottom:24,border:"1px solid #232323" }}>
              <div style={{ fontSize:14,fontWeight:700,marginBottom:14,color:"#f2efe8" }}>Vender membresía</div>
              <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                <ClienteInput value={paseForm.cliente} clientes={clientes} err={paseErrors.cliente} sInp={sInp}
                  onChange={v=>{setPaseForm(f=>({...f,cliente:v}));setPaseErrors(er=>({...er,cliente:false}));}}
                  onPick={c=>setPaseForm(f=>({...f,cliente:c.nombre,telefono:c.telefono||f.telefono}))} />
                <input type="tel" placeholder="Teléfono" value={paseForm.telefono} style={sInp(paseErrors.telefono)} onChange={e=>{setPaseForm(f=>({...f,telefono:e.target.value}));setPaseErrors(er=>({...er,telefono:false}));}} />
                <Sel field="tipo" options={TIPOS_PASE} placeholder="Tipo de membresía" value={paseForm.tipo} errs={paseErrors} onChange={e=>{setPaseForm(f=>({...f,tipo:e.target.value}));setPaseErrors(er=>({...er,tipo:false}));}} />
                <Sel field="barbero" options={BARBEROS} placeholder="Barbero titular" value={paseForm.barbero} errs={paseErrors} onChange={e=>{setPaseForm(f=>({...f,barbero:e.target.value}));setPaseErrors(er=>({...er,barbero:false}));}} />
                <Sel field="medioPago" options={MEDIOS_PAGO} placeholder="Medio de pago" value={paseForm.medioPago} errs={paseErrors} onChange={e=>{setPaseForm(f=>({...f,medioPago:e.target.value}));setPaseErrors(er=>({...er,medioPago:false}));}} />
                <input placeholder="Monto cobrado ($)" type="number" value={paseForm.monto} style={sInp(paseErrors.monto)} onChange={e=>{setPaseForm(f=>({...f,monto:e.target.value}));setPaseErrors(er=>({...er,monto:false}));}} />
                {paseForm.tipo && (
                  <div style={{ background:"#181818",border:"1px solid #2a2a2a",borderRadius:8,padding:"10px 12px",fontSize:12,color:"#888" }}>
                    Vence en {PASE_CONFIG[paseForm.tipo].dias} días · genera {PASE_CONFIG[paseForm.tipo].cuotas} cuota{PASE_CONFIG[paseForm.tipo].cuotas>1?"s":""} de {fmt(PASE_CONFIG[paseForm.tipo].montoCuota)} para el barbero
                  </div>
                )}
                <button onClick={handleVenderPase} style={{ padding:"12px 0",borderRadius:10,border:"none",background:"#f2efe8",color:"#0f0f0f",fontWeight:800,fontSize:15,cursor:"pointer" }}>Vender membresía</button>
                {Object.values(paseErrors).some(Boolean)&&<div style={{ color:"#e05c5c",fontSize:13,textAlign:"center" }}>Completá todos los campos.</div>}
              </div>
            </div>

            {/* Lista de pases */}
            {pases.length===0
              ? <div style={{ textAlign:"center",color:"#555",padding:"30px 0",fontSize:14 }}>Todavía no vendiste ninguna membresía.</div>
              : pases.map(p=>{
                const dRest = diasEntre(hoy(), p.vence.slice(0,10));
                const activo = dRest >= 0;
                return (
                  <div key={p.id} onClick={()=>setPaseDetalle(p.id)} style={{ background:"#141414",borderRadius:12,padding:16,border:`1px solid ${activo?"#1e2a1e":"#2a1e1e"}`,marginBottom:10,cursor:"pointer" }}>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                      <div>
                        <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4 }}>
                          <span style={{ fontWeight:700,fontSize:15 }}>{p.cliente}</span>
                          <span style={{ fontSize:10,background:activo?"#1e2a1e":"#2a1e1e",color:activo?"#7ec87e":"#e05c5c",borderRadius:4,padding:"2px 7px",fontWeight:600 }}>{activo?"ACTIVO":"VENCIDO"}</span>
                        </div>
                        <div style={{ fontSize:12,color:"#888" }}>{p.tipo} · {p.barbero.split(" ")[0]}</div>
                        <div style={{ fontSize:12,color:"#666",marginTop:2 }}>{p.visitas.length} visita{p.visitas.length!==1?"s":""} · vence {formatFecha(p.vence)}</div>
                      </div>
                      <div style={{ textAlign:"right" }}>
                        <div style={{ fontSize:14,fontWeight:700,color:activo?"#7ec87e":"#e05c5c" }}>{activo?`${dRest} días`:`hace ${Math.abs(dRest)}d`}</div>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
        )}

        {/* ── DETALLE PASE ── */}
        {vista === "membresias" && paseDetalle && (() => {
          const p = pases.find(x => x.id === paseDetalle);
          if (!p) return null;
          const dRest = diasEntre(hoy(), p.vence.slice(0,10));
          const activo = dRest >= 0;
          // visitas por barbero
          const visitasPorBarbero = {};
          p.visitas.forEach(v => { visitasPorBarbero[v.barbero] = (visitasPorBarbero[v.barbero]||0)+1; });
          return (
            <div style={{ paddingTop:24 }}>
              <button onClick={()=>setPaseDetalle(null)} style={{ background:"transparent",border:"none",color:"#f2efe8",cursor:"pointer",fontSize:13,padding:0,marginBottom:16 }}>← Volver</button>
              <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4 }}>
                <span style={{ fontSize:16,fontWeight:700 }}>{p.cliente}</span>
                <span style={{ fontSize:10,background:activo?"#1e2a1e":"#2a1e1e",color:activo?"#7ec87e":"#e05c5c",borderRadius:4,padding:"2px 7px",fontWeight:600 }}>{activo?"ACTIVO":"VENCIDO"}</span>
              </div>
              <div style={{ fontSize:12,color:"#888",marginBottom:20 }}>{p.tipo} · titular {p.barbero} · {fmt(p.monto)} ({p.medioPago})</div>

              {/* Stats */}
              <div style={{ background:"#141414",borderRadius:12,padding:16,marginBottom:20,border:"1px solid #232323",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10 }}>
                <div style={{ background:"#1a1a1a",borderRadius:8,padding:"10px 12px" }}><div style={{ fontSize:11,color:"#888",marginBottom:3 }}>Visitas</div><div style={{ fontSize:20,fontWeight:800,color:"#f2efe8" }}>{p.visitas.length}</div></div>
                <div style={{ background:"#1a1a1a",borderRadius:8,padding:"10px 12px" }}><div style={{ fontSize:11,color:"#888",marginBottom:3 }}>Vence</div><div style={{ fontSize:13,fontWeight:700 }}>{formatFecha(p.vence)}</div></div>
                <div style={{ background:"#1a1a1a",borderRadius:8,padding:"10px 12px" }}><div style={{ fontSize:11,color:"#888",marginBottom:3 }}>{activo?"Restan":"Venció"}</div><div style={{ fontSize:14,fontWeight:800,color:activo?"#7ec87e":"#e05c5c" }}>{activo?`${dRest}d`:`-${Math.abs(dRest)}d`}</div></div>
              </div>

              {/* Registrar visita */}
              {activo && (
                <div style={{ background:"#141414",borderRadius:12,padding:16,marginBottom:20,border:"1px solid #232323" }}>
                  <div style={{ fontSize:13,fontWeight:700,marginBottom:10 }}>Registrar visita de hoy</div>
                  <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
                    <select value={visitaBarbero[p.id]||p.barbero} onChange={e=>setVisitaBarbero(v=>({...v,[p.id]:e.target.value}))} style={{ ...sInp(false),color:"#f0ede6",appearance:"none" }}>
                      {BARBEROS.map(b=><option key={b} value={b}>{b}{b===p.barbero?" (titular)":""}</option>)}
                    </select>
                    <div style={{ display:"flex",gap:8 }}>
                      <input type="number" placeholder="Propina (opcional)" value={visitaPropina[p.id]||""} onChange={e=>setVisitaPropina(v=>({...v,[p.id]:e.target.value}))} style={{ ...sInp(false),flex:1 }} />
                      {Number(visitaPropina[p.id])>0 && (
                        <select value={visitaMedio[p.id]||"Efectivo"} onChange={e=>setVisitaMedio(v=>({...v,[p.id]:e.target.value}))} style={{ ...sInp(false),flex:1,color:"#f0ede6",appearance:"none" }}>
                          {MEDIOS_PAGO.map(m=><option key={m} value={m}>{m}</option>)}
                        </select>
                      )}
                    </div>
                    <button onClick={()=>handleRegistrarVisita(p.id)} style={{ padding:"10px 0",borderRadius:8,border:"none",background:"#7ec87e",color:"#0f0f0f",fontWeight:700,cursor:"pointer" }}>+ Registrar visita</button>
                  </div>
                </div>
              )}

              {/* Visitas por barbero */}
              {Object.keys(visitasPorBarbero).length>0 && (
                <div style={{ marginBottom:20 }}>
                  <div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"uppercase",letterSpacing:1 }}>Visitas por barbero</div>
                  {Object.entries(visitasPorBarbero).map(([b,n])=>(
                    <div key={b} style={{ display:"flex",justifyContent:"space-between",background:"#141414",borderRadius:8,padding:"10px 14px",border:"1px solid #1e1e1e",marginBottom:6 }}>
                      <span style={{ fontSize:14 }}>{b}{b===p.barbero?" (titular)":""}</span><span style={{ fontWeight:700,color:"#f2efe8" }}>{n}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Historial de visitas */}
              <div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"uppercase",letterSpacing:1 }}>Historial de visitas</div>
              {p.visitas.length===0
                ? <div style={{ color:"#555",fontSize:14,padding:"10px 0 20px" }}>Sin visitas todavía.</div>
                : [...p.visitas].reverse().map((v,i)=>(
                  <div key={i} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",background:"#141414",borderRadius:8,padding:"10px 14px",border:"1px solid #1e1e1e",marginBottom:6 }}>
                    <span style={{ fontSize:13,color:"#aaa" }}>{formatFecha(v.fecha)} · {formatHora(v.fecha)}</span>
                    <span style={{ fontSize:13,textAlign:"right" }}>{v.barbero.split(" ")[0]}{v.propina>0&&<span style={{ color:"#7ec87e",marginLeft:8 }}>+{fmt(v.propina)} ({v.medioPropina})</span>}</span>
                  </div>
                ))
              }

              {/* Cuotas */}
              <div style={{ fontSize:12,color:"#888",margin:"20px 0 8px",textTransform:"uppercase",letterSpacing:1 }}>Cuotas de comisión (titular: {p.barbero.split(" ")[0]})</div>
              {p.cuotas.map(c=>{
                const rest = c.monto - c.pagado;
                const vencida = c.vence <= new Date().toISOString() && rest > 0;
                const saldada = rest <= 0;
                return (
                  <div key={c.n} style={{ background:"#141414",borderRadius:8,padding:"12px 14px",border:`1px solid ${saldada?"#1e2a1e":vencida?"#2a1e1e":"#1e1e1e"}`,marginBottom:6,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                    <div>
                      <div style={{ fontSize:13,fontWeight:600 }}>Cuota {c.n} · {fmt(c.monto)}</div>
                      <div style={{ fontSize:11,color:vencida?"#e05c5c":"#666" }}>vence {formatFecha(c.vence)}{c.pagado>0&&!saldada?` · pagado ${fmt(c.pagado)}`:""}</div>
                    </div>
                    {saldada
                      ? <span style={{ fontSize:12,color:"#7ec87e",fontWeight:700 }}>✓ Pagada</span>
                      : <button onClick={()=>{setCuotaPago({paseId:p.id,n:c.n,restante:rest});setCuotaMonto("");setCuotaMedio("");}} style={{ background:vencida?"#b09a78":"#2a2a2a",color:vencida?"#0f0f0f":"#aaa",border:"none",borderRadius:6,padding:"6px 12px",fontSize:12,fontWeight:700,cursor:"pointer" }}>Pagar</button>
                    }
                  </div>
                );
              })}

              <button onClick={()=>setConfirmDeletePase(p.id)} style={{ marginTop:20,background:"transparent",border:"none",color:"#555",fontSize:12,cursor:"pointer" }}>🗑 Eliminar pase</button>
            </div>
          );
        })()}

        {/* ── CAJA ── */}
        {vista === "caja" && (
          <div style={{ paddingTop:24 }}>
            <div style={{ fontSize:16,fontWeight:700,marginBottom:4,color:"#f2efe8" }}>Caja</div>
            <div style={{ fontSize:12,color:"#666",marginBottom:20 }}>Saldos acumulados de todo el historial</div>
            <div style={{ display:"flex",flexDirection:"column",gap:12,marginBottom:24 }}>
              <div style={{ background:"#141414",borderRadius:12,padding:16,border:"1px solid #2a2218" }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                  <div><div style={{ fontSize:13,color:"#888" }}>💵 Efectivo en caja</div><div style={{ fontSize:11,color:"#555",marginTop:2 }}>incluye {fmt(CAJA_INICIAL_EFECTIVO)} de fondo inicial</div></div>
                  <div style={{ fontSize:24,fontWeight:800,color:"#f2efe8" }}>{fmt(saldos.efectivo)}</div>
                </div>
              </div>
              <div style={{ background:"#141414",borderRadius:12,padding:16,border:"1px solid #1e2630" }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                  <div><div style={{ fontSize:13,color:"#888" }}>📱 MercadoPago (neto)</div><div style={{ fontSize:11,color:"#555",marginTop:2 }}>Transferencia + Posnet + QR, con IIBB descontado</div></div>
                  <div style={{ fontSize:24,fontWeight:800,color:"#5a9fd4" }}>{fmt(saldos.mp)}</div>
                </div>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
                <div style={{ background:"#141414",borderRadius:12,padding:14,border:"1px solid #1e1e1e" }}><div style={{ fontSize:12,color:"#888",marginBottom:4 }}>Total general</div><div style={{ fontSize:18,fontWeight:800 }}>{fmt(saldos.total)}</div></div>
                <div style={{ background:"#141414",borderRadius:12,padding:14,border:"1px solid #1e1e1e" }}><div style={{ fontSize:12,color:"#888",marginBottom:4 }}>IIBB acumulado</div><div style={{ fontSize:18,fontWeight:800,color:"#b09a78" }}>{fmt(saldos.iibbTotal)}</div></div>
              </div>
            </div>
            <div style={{ background:"#141414",borderRadius:12,padding:16,marginBottom:24,border:"1px solid #232323" }}>
              <div style={{ fontSize:12,color:"#888",marginBottom:10,textTransform:"uppercase",letterSpacing:1 }}>Movimientos de hoy</div>
              <div style={{ display:"flex",flexDirection:"column",gap:8,fontSize:13 }}>
                <div style={{ display:"flex",justifyContent:"space-between" }}><span style={{ color:"#aaa" }}>Entró efectivo</span><span style={{ color:"#7ec87e",fontWeight:700 }}>+{fmt(movHoy.entraEfec)}</span></div>
                <div style={{ display:"flex",justifyContent:"space-between" }}><span style={{ color:"#aaa" }}>Entró MercadoPago (neto)</span><span style={{ color:"#7ec87e",fontWeight:700 }}>+{fmt(movHoy.entraMP)}</span></div>
                {movHoy.saleEfec>0&&<div style={{ display:"flex",justifyContent:"space-between" }}><span style={{ color:"#aaa" }}>Pagos en efectivo</span><span style={{ color:"#e05c5c",fontWeight:700 }}>−{fmt(movHoy.saleEfec)}</span></div>}
                {movHoy.saleMP>0&&<div style={{ display:"flex",justifyContent:"space-between" }}><span style={{ color:"#aaa" }}>Pagos por MercadoPago</span><span style={{ color:"#e05c5c",fontWeight:700 }}>−{fmt(movHoy.saleMP)}</span></div>}
                {movHoy.iibbDia>0&&<div style={{ display:"flex",justifyContent:"space-between" }}><span style={{ color:"#aaa" }}>IIBB retenido hoy</span><span style={{ color:"#b09a78" }}>{fmt(movHoy.iibbDia)}</span></div>}
              </div>
            </div>
            <div style={{ borderTop:"1px solid #1e1e1e",paddingTop:20 }}>
              <div style={{ fontSize:14,fontWeight:700,marginBottom:4,color:"#f2efe8" }}>Cierre diario</div>
              <div style={{ fontSize:12,color:"#666",marginBottom:16 }}>Compará lo real contra el saldo del sistema</div>
              <div style={{ background:"#141414",borderRadius:10,padding:14,border:"1px solid #1e1e1e",marginBottom:12 }}>
                <div style={{ fontSize:13,fontWeight:600,marginBottom:10 }}>💵 Efectivo</div>
                <div style={{ display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:8 }}><span style={{ color:"#888" }}>Sistema espera</span><span style={{ color:"#f2efe8",fontWeight:700 }}>{fmt(saldos.efectivo)}</span></div>
                <input type="number" placeholder="¿Cuánto contaste en caja?" value={contadoEfectivo} onChange={e=>setContadoEfectivo(e.target.value)} style={sInp(false)} />
                {contadoEfectivo!==""&&(()=>{ const d=Number(contadoEfectivo)-saldos.efectivo; return <div style={{ marginTop:8,fontSize:13,fontWeight:700,color:d===0?"#7ec87e":d>0?"#7ec87e":"#e05c5c" }}>{d===0?"✓ Cuadra exacto":d>0?`Sobran ${fmt(d)}`:`Faltan ${fmt(Math.abs(d))}`}</div>; })()}
              </div>
              <div style={{ background:"#141414",borderRadius:10,padding:14,border:"1px solid #1e1e1e",marginBottom:16 }}>
                <div style={{ fontSize:13,fontWeight:600,marginBottom:10 }}>📱 MercadoPago</div>
                <div style={{ display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:8 }}><span style={{ color:"#888" }}>Sistema espera</span><span style={{ color:"#5a9fd4",fontWeight:700 }}>{fmt(saldos.mp)}</span></div>
                <input type="number" placeholder="¿Saldo real en la app de MP?" value={contadoMP} onChange={e=>setContadoMP(e.target.value)} style={sInp(false)} />
                {contadoMP!==""&&(()=>{ const d=Number(contadoMP)-saldos.mp; return <div style={{ marginTop:8,fontSize:13,fontWeight:700,color:d===0?"#7ec87e":d>0?"#7ec87e":"#e05c5c" }}>{d===0?"✓ Cuadra exacto":d>0?`Sobran ${fmt(d)}`:`Faltan ${fmt(Math.abs(d))}`}</div>; })()}
              </div>
              <button onClick={handleGuardarCierre} style={{ width:"100%",padding:"12px 0",borderRadius:10,border:"none",background:"#f2efe8",color:"#0f0f0f",fontWeight:800,fontSize:15,cursor:"pointer" }}>Guardar cierre del día</button>
            </div>

            {/* Agregar gasto */}
            <div style={{ marginTop:28,borderTop:"1px solid #1e1e1e",paddingTop:20 }}>
              <div style={{ fontSize:14,fontWeight:700,marginBottom:4,color:"#f2efe8" }}>Agregar gasto</div>
              <div style={{ fontSize:12,color:"#666",marginBottom:14 }}>Descuenta de la billetera elegida.</div>
              <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                <input placeholder="Descripción corta (ej: productos, alquiler)" value={gastoForm.desc} style={sInp(false)} onChange={e=>setGastoForm(f=>({...f,desc:e.target.value}))} />
                <div style={{ display:"flex",gap:10 }}>
                  <input type="number" placeholder="Monto ($)" value={gastoForm.monto} style={{...sInp(false),flex:1}} onChange={e=>setGastoForm(f=>({...f,monto:e.target.value}))} />
                  <select value={gastoForm.medioPago} onChange={e=>setGastoForm(f=>({...f,medioPago:e.target.value}))} style={{ ...sInp(false),flex:1,color:gastoForm.medioPago?"#f0ede6":"#666",appearance:"none" }}>
                    <option value="">¿De dónde sale?</option>
                    {MEDIOS_PAGO_BARBERO.map(m=><option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <button onClick={handleAgregarGasto} style={{ padding:"12px 0",borderRadius:10,border:"none",background:"#2a1e1e",color:"#e0846a",fontWeight:800,fontSize:15,cursor:"pointer" }}>Registrar gasto</button>
              </div>
              {gastos.length>0 && (
                <div style={{ marginTop:16 }}>
                  <div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"uppercase",letterSpacing:1 }}>Gastos recientes</div>
                  {gastos.slice(0,10).map(g=>(
                    <div key={g.id} style={{ background:"#141414",borderRadius:8,padding:"10px 14px",border:"1px solid #1e1e1e",marginBottom:6,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                      <div><div style={{ fontSize:14,fontWeight:600 }}>{g.desc}</div><div style={{ fontSize:12,color:"#666" }}>💳 {g.medioPago} · {formatFecha(g.fecha)}</div></div>
                      <div style={{ display:"flex",alignItems:"center",gap:10 }}><span style={{ fontSize:14,fontWeight:700,color:"#e0846a" }}>−{fmt(g.monto)}</span><button onClick={()=>setConfirmDeleteGasto(g.id)} style={{ background:"transparent",border:"none",color:"#444",fontSize:12,cursor:"pointer" }}>🗑</button></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cierres.length>0&&(
              <div style={{ marginTop:28,borderTop:"1px solid #1e1e1e",paddingTop:20 }}>
                <div style={{ fontSize:12,color:"#888",marginBottom:10,textTransform:"uppercase",letterSpacing:1 }}>Cierres guardados</div>
                {cierres.slice(0,15).map(c=>{
                  const dEf=c.contadoEfectivo!==null?c.contadoEfectivo-c.esperadoEfectivo:null;
                  const dMp=c.contadoMP!==null?c.contadoMP-c.esperadoMP:null;
                  return (
                    <div key={c.id} style={{ background:"#141414",borderRadius:10,padding:"12px 14px",border:"1px solid #1e1e1e",marginBottom:8 }}>
                      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6 }}><span style={{ fontSize:14,fontWeight:600 }}>{formatFecha(c.fecha)}</span><button onClick={()=>setConfirmDeleteCierre(c.id)} style={{ background:"transparent",border:"none",color:"#444",fontSize:12,cursor:"pointer" }}>🗑</button></div>
                      <div style={{ display:"flex",flexDirection:"column",gap:4,fontSize:12 }}>
                        {dEf!==null&&<div style={{ display:"flex",justifyContent:"space-between" }}><span style={{ color:"#888" }}>💵 contado {fmt(c.contadoEfectivo)} / esp. {fmt(c.esperadoEfectivo)}</span><span style={{ color:dEf===0?"#7ec87e":dEf>0?"#7ec87e":"#e05c5c",fontWeight:700 }}>{dEf===0?"OK":(dEf>0?"+":"")+fmt(dEf)}</span></div>}
                        {dMp!==null&&<div style={{ display:"flex",justifyContent:"space-between" }}><span style={{ color:"#888" }}>📱 contado {fmt(c.contadoMP)} / esp. {fmt(c.esperadoMP)}</span><span style={{ color:dMp===0?"#7ec87e":dMp>0?"#7ec87e":"#e05c5c",fontWeight:700 }}>{dMp===0?"OK":(dMp>0?"+":"")+fmt(dMp)}</span></div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── COMISIÓN BARBEROS (lista) ── */}
        {vista === "comisiones" && !barberoDetalle && (
          <div style={{ paddingTop:24 }}>
            <div style={{ fontSize:16,fontWeight:700,marginBottom:4,color:"#f2efe8" }}>Comisión barberos</div>
            <div style={{ fontSize:12,color:"#666",marginBottom:20 }}>Pendiente de cortes y de membresías</div>
            <div style={{ display:"flex",flexDirection:"column",gap:12,marginBottom:28 }}>
              {BARBEROS.map(b=>{
                const cor = comisionCortesBarbero(b);
                const mem = comisionMembresiaBarbero(b);
                const aPagar = cor.pendiente + mem.vencidoPendiente; // tarea diaria: cortes + cuotas vencidas
                const totalPend = cor.pendiente + mem.totalPendiente;
                const porVencer = mem.totalPendiente - mem.vencidoPendiente;
                return (
                  <div key={b} onClick={()=>setBarberoDetalle(b)} style={{ background:"#141414",borderRadius:12,padding:16,border:`1px solid ${aPagar>0?"#2a2218":"#1e2a1e"}`,cursor:"pointer" }}>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                      <div>
                        <div style={{ fontWeight:700,fontSize:15,marginBottom:4 }}>{b}</div>
                        <div style={{ fontSize:12,color:"#888" }}>Cortes: {fmt(cor.pendiente)}{mem.vencidoPendiente>0?` · Cuotas vencidas: ${fmt(mem.vencidoPendiente)}`:""}</div>
                        {porVencer>0&&<div style={{ fontSize:11,color:"#666",marginTop:2 }}>+ {fmt(porVencer)} en cuotas por vencer</div>}
                      </div>
                      <div style={{ textAlign:"right" }}><div style={{ fontSize:22,fontWeight:800,color:aPagar>0?"#b09a78":"#7ec87e" }}>{fmt(aPagar)}</div><div style={{ fontSize:11,color:"#555" }}>a pagar ahora</div></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ borderTop:"1px solid #1e1e1e",paddingTop:20 }}>
              <div style={{ fontSize:14,fontWeight:700,marginBottom:4,color:"#f2efe8" }}>Pagar cortes a barbero</div>
              <div style={{ fontSize:11,color:"#666",marginBottom:14 }}>Las cuotas de membresía se pagan desde cada pase.</div>
              <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                <Sel field="barbero" options={BARBEROS} placeholder="Barbero" value={pagoForm.barbero} errs={pagoErrors} onChange={e=>{setPagoForm(f=>({...f,barbero:e.target.value}));setPagoErrors(er=>({...er,barbero:false}));}} />
                <input type="number" placeholder="Monto pagado ($)" value={pagoForm.monto} style={sInp(pagoErrors.monto)} onChange={e=>{setPagoForm(f=>({...f,monto:e.target.value}));setPagoErrors(er=>({...er,monto:false}));}} />
                <Sel field="medioPago" options={MEDIOS_PAGO_BARBERO} placeholder="Medio de pago (Efectivo o MercadoPago)" value={pagoForm.medioPago} errs={pagoErrors} onChange={e=>{setPagoForm(f=>({...f,medioPago:e.target.value}));setPagoErrors(er=>({...er,medioPago:false}));}} />
                <input type="text" placeholder="Nota (opcional)" value={pagoForm.nota} style={sInp(false)} onChange={e=>setPagoForm(f=>({...f,nota:e.target.value}))} />
                <button onClick={handleRegistrarPago} style={{ padding:"12px 0",borderRadius:10,border:"none",background:"#2a3a2a",color:"#7ec87e",fontWeight:800,fontSize:15,cursor:"pointer" }}>Registrar pago de cortes</button>
                {Object.values(pagoErrors).some(Boolean)&&<div style={{ color:"#e05c5c",fontSize:13,textAlign:"center" }}>Completá barbero, monto y medio de pago.</div>}
              </div>
            </div>
          </div>
        )}

        {/* ── DETALLE BARBERO ── */}
        {vista === "comisiones" && barberoDetalle && (() => {
          const cor = comisionCortesBarbero(barberoDetalle);
          const mem = comisionMembresiaBarbero(barberoDetalle);
          return (
            <div style={{ paddingTop:24 }}>
              <button onClick={()=>setBarberoDetalle(null)} style={{ background:"transparent",border:"none",color:"#f2efe8",cursor:"pointer",fontSize:13,padding:0,marginBottom:16 }}>← Volver</button>
              <div style={{ fontSize:16,fontWeight:700,marginBottom:4 }}>{barberoDetalle}</div>
              <div style={{ fontSize:12,color:"#888",marginBottom:20 }}>Pendiente total {fmt(cor.pendiente + mem.totalPendiente)}</div>

              {/* Cortes */}
              <div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"uppercase",letterSpacing:1 }}>Cortes</div>
              <div style={{ background:"#141414",borderRadius:12,padding:16,marginBottom:20,border:"1px solid #232323",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10 }}>
                {[["Comisiones",fmt(cor.total),"#f2efe8"],["Pagado",fmt(cor.pagado),"#7ec87e"],["Pendiente",fmt(cor.pendiente),cor.pendiente>0?"#b09a78":"#7ec87e"]].map(([l,v,col])=>(
                  <div key={l} style={{ background:"#1a1a1a",borderRadius:8,padding:"10px 12px" }}><div style={{ fontSize:11,color:"#888",marginBottom:3 }}>{l}</div><div style={{ fontSize:15,fontWeight:800,color:col }}>{v}</div></div>
                ))}
              </div>

              {/* Membresías */}
              <div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"uppercase",letterSpacing:1 }}>Membresías (cuotas)</div>
              {mem.cuotas.filter(c=>c.monto-c.pagado>0).length===0
                ? <div style={{ color:"#555",fontSize:14,padding:"6px 0 16px" }}>Sin cuotas pendientes.</div>
                : mem.cuotas.filter(c=>c.monto-c.pagado>0).sort((a,b)=>a.vence.localeCompare(b.vence)).map((c,i)=>{
                  const rest = c.monto - c.pagado;
                  const vencida = c.vence <= new Date().toISOString();
                  return (
                    <div key={i} style={{ background:"#141414",borderRadius:8,padding:"12px 14px",border:`1px solid ${vencida?"#2a1e1e":"#1e1e1e"}`,marginBottom:6,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                      <div>
                        <div style={{ fontSize:13,fontWeight:600 }}>{c.cliente} · cuota {c.n}</div>
                        <div style={{ fontSize:11,color:vencida?"#e05c5c":"#666" }}>{c.tipo} · vence {formatFecha(c.vence)}{c.pagado>0?` · pagado ${fmt(c.pagado)}`:""}</div>
                      </div>
                      <button onClick={()=>{setCuotaPago({paseId:c.paseId,n:c.n,restante:rest});setCuotaMonto("");setCuotaMedio("");}} style={{ background:vencida?"#b09a78":"#2a2a2a",color:vencida?"#0f0f0f":"#aaa",border:"none",borderRadius:6,padding:"6px 12px",fontSize:12,fontWeight:700,cursor:"pointer" }}>{fmt(rest)}</button>
                    </div>
                  );
                })
              }

              {/* Pagos realizados */}
              <div style={{ fontSize:12,color:"#888",margin:"20px 0 8px",textTransform:"uppercase",letterSpacing:1 }}>Pagos realizados</div>
              {pagos.filter(p=>p.barbero===barberoDetalle).length===0
                ? <div style={{ color:"#555",fontSize:14,padding:"6px 0" }}>Sin pagos.</div>
                : pagos.filter(p=>p.barbero===barberoDetalle).map(p=>(
                  <div key={p.id} style={{ background:"#141414",borderRadius:10,padding:"12px 14px",border:"1px solid #1e2a1e",marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                    <div>
                      <div style={{ fontSize:14,fontWeight:600,color:"#7ec87e" }}>{fmt(p.monto)} <span style={{ fontSize:10,color:"#666",fontWeight:400 }}>{p.tipo==="membresia"?"membresía":"cortes"}</span></div>
                      <div style={{ fontSize:12,color:"#666" }}>💳 {p.medioPago} · {formatFecha(p.fecha)}{p.nota?` · ${p.nota}`:""}</div>
                    </div>
                    <button onClick={()=>setConfirmDeletePago(p.id)} style={{ background:"transparent",border:"none",color:"#444",fontSize:12,cursor:"pointer" }}>🗑</button>
                  </div>
                ))
              }
            </div>
          );
        })()}

        {/* ── INICIO (Panel de control) ── */}
        {vista === "inicio" && esAdmin && (() => {
          const turnosHoy = turnos.filter(t=>t.fecha===hoy()).sort((a,b)=>a.hora.localeCompare(b.hora));
          const alertas48 = turnos.filter(t=>{ const h=horasHasta(t.fecha,t.hora); return h>=0 && h<48; });
          const cortesHoy = cortes.filter(c=>c.fecha.slice(0,10)===hoy());
          const ingresoHoy = cortesHoy.reduce((a,c)=>a+c.monto+c.propina,0) + pases.filter(p=>p.fechaCompra.slice(0,10)===hoy()).reduce((a,p)=>a+p.monto,0);
          return (
            <div style={{ paddingTop:20 }}>
              <div style={{ fontSize:16,fontWeight:700,marginBottom:16,color:"#f2efe8" }}>Hola, {ADMIN_NOMBRE.split(" ")[0]} 👋</div>

              {/* Aprobaciones destacado */}
              {pendCount>0 && (
                <button onClick={()=>setVista("aprobaciones")} style={{ width:"100%",textAlign:"left",background:"#3a2e16",border:"1px solid #5a4a22",borderRadius:12,padding:"14px 16px",marginBottom:16,cursor:"pointer" }}>
                  <div style={{ fontSize:14,fontWeight:700,color:"#f2d488" }}>⏳ {pendCount} {pendCount===1?"solicitud pendiente":"solicitudes pendientes"}</div>
                  <div style={{ fontSize:12,color:"#b09a78",marginTop:2 }}>Tocá para revisar cortes y puntos a aprobar</div>
                </button>
              )}

              {/* Caja del día */}
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14 }}>
                <div style={{ background:"#141414",borderRadius:12,padding:14,border:"1px solid #2a2218" }}><div style={{ fontSize:12,color:"#888",marginBottom:4 }}>💵 Efectivo en caja</div><div style={{ fontSize:18,fontWeight:800,color:"#f2efe8" }}>{fmt(saldos.efectivo)}</div></div>
                <div style={{ background:"#141414",borderRadius:12,padding:14,border:"1px solid #1e2630" }}><div style={{ fontSize:12,color:"#888",marginBottom:4 }}>📱 MercadoPago</div><div style={{ fontSize:18,fontWeight:800,color:"#5a9fd4" }}>{fmt(saldos.mp)}</div></div>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:24 }}>
                <div style={{ background:"#141414",borderRadius:12,padding:14,border:"1px solid #1e1e1e" }}><div style={{ fontSize:12,color:"#888",marginBottom:4 }}>Cortes hoy</div><div style={{ fontSize:18,fontWeight:800 }}>{cortesHoy.length}</div></div>
                <div style={{ background:"#141414",borderRadius:12,padding:14,border:"1px solid #1e1e1e" }}><div style={{ fontSize:12,color:"#888",marginBottom:4 }}>Ingresos hoy</div><div style={{ fontSize:18,fontWeight:800,color:"#7ec87e" }}>{fmt(ingresoHoy)}</div></div>
              </div>

              {/* Alertas 48hs */}
              {alertas48.length>0 && (
                <div style={{ marginBottom:24 }}>
                  <div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"uppercase",letterSpacing:1 }}>⏰ Recordar enviar WhatsApp (faltan &lt;48hs)</div>
                  {alertas48.map(t=>(
                    <div key={t.id} style={{ background:"#141414",borderRadius:10,padding:"12px 14px",border:"1px solid #3a2e16",marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                      <div><div style={{ fontSize:14,fontWeight:600 }}>{t.cliente}</div><div style={{ fontSize:12,color:"#888" }}>{formatFecha(t.fecha)} {t.hora} · {t.barbero.split(" ")[0]}</div></div>
                      <a href={waLink(t)} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none",padding:"7px 12px",borderRadius:8,background:"#1e3324",color:"#7ec87e",fontSize:12,fontWeight:700 }}>💬</a>
                    </div>
                  ))}
                </div>
              )}

              {/* Turnos de hoy */}
              <div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"uppercase",letterSpacing:1 }}>Turnos de hoy</div>
              {turnosHoy.length===0
                ? <div style={{ color:"#555",fontSize:14,padding:"6px 0 20px" }}>No hay turnos para hoy.</div>
                : turnosHoy.map(t=>(
                  <div key={t.id} style={{ background:"#141414",borderRadius:10,padding:"10px 14px",border:"1px solid #1e1e1e",marginBottom:6,display:"flex",alignItems:"center",gap:12 }}>
                    <span style={{ fontSize:16,fontWeight:800,color:"#f2efe8",minWidth:48 }}>{t.hora}</span>
                    <div style={{ flex:1 }}><div style={{ fontSize:14,fontWeight:600 }}>{t.cliente}</div><div style={{ fontSize:12,color:"#888" }}>{t.barbero.split(" ")[0]} · {t.barba?"corte+barba":"corte"}</div></div>
                  </div>
                ))
              }

              {/* Mis Logros PDC (Alejandra) */}
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",margin:"24px 0 10px" }}>
                <div style={{ fontSize:12,color:"#888",textTransform:"uppercase",letterSpacing:1 }}>Mis Logros PDC</div>
                <div style={{ fontSize:13,fontWeight:800,color:"#f2efe8" }}>{scores.filter(s=>s.persona==="Recepción / Admin").reduce((a,s)=>a+s.puntos,0)} pts</div>
              </div>
              <div style={{ fontSize:11,color:"#666",marginBottom:12 }}>Tocá una tarea cuando la hayas hecho para sumarte los puntos.</div>
              {catsDisponibles("Recepción / Admin").length===0
                ? <div style={{ color:"#555",fontSize:14,padding:"6px 0" }}>No quedan logros disponibles.</div>
                : catsDisponibles("Recepción / Admin").map(c=>(
                  <button key={c.t} onClick={()=>setConfirmLogro(c)} style={{ width:"100%",textAlign:"left",background:"#141414",border:"1px solid #1e1e1e",borderRadius:10,padding:"12px 14px",marginBottom:8,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                    <div>
                      <div style={{ fontSize:14,fontWeight:600,color:"#f0ede6" }}>⭐ {c.t}</div>
                      <div style={{ fontSize:11,color:"#666",marginTop:2 }}>{c.pts} pto{c.pts!==1?"s":""}{c.unica?" · única vez":""}</div>
                    </div>
                    <span style={{ fontSize:13,fontWeight:800,color:"#7ec87e" }}>+{c.pts}</span>
                  </button>
                ))
              }
            </div>
          );
        })()}

        {/* ── TURNOS ── */}
        {vista === "turnos" && (() => {
          const lista = turnos.filter(t => {
            if (barberoActivo && t.barbero !== barberoActivo) return false;
            if (!barberoActivo && turnoFiltroBarbero !== "Todos" && t.barbero !== turnoFiltroBarbero) return false;
            if (turnoModo === "dia") return t.fecha === turnoFecha;
            const { desde, hasta } = rangoSemana(turnoFecha);
            return t.fecha >= desde && t.fecha <= hasta;
          }).sort((a,b)=> (a.fecha+a.hora).localeCompare(b.fecha+b.hora));
          // agrupar por fecha para vista semana
          const porFecha = {};
          lista.forEach(t => { (porFecha[t.fecha] = porFecha[t.fecha] || []).push(t); });
          const sem = rangoSemana(turnoFecha);
          const labelSem = `${formatFecha(sem.desde+"T12:00:00")} → ${formatFecha(sem.hasta+"T12:00:00")}`;
          const diaNombre = iso => new Date(iso+"T12:00:00").toLocaleDateString("es-AR",{weekday:"long"});
          return (
            <div style={{ paddingTop:24 }}>
              <div style={{ fontSize:16,fontWeight:700,marginBottom:16,color:"#f2efe8" }}>Turnos</div>

              {/* Agendar */}
              <div style={{ background:"#141414",borderRadius:12,padding:16,marginBottom:22,border:"1px solid #232323" }}>
                <div style={{ fontSize:14,fontWeight:700,marginBottom:14,color:"#f2efe8" }}>Agendar turno</div>
                <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                  <div style={{ display:"flex",gap:8 }}>
                    <input type="date" value={turnoForm.fecha} onChange={e=>{setTurnoForm(f=>({...f,fecha:e.target.value}));setTurnoErrors(er=>({...er,fecha:false}));}} style={{ ...sInp(turnoErrors.fecha),flex:2 }} />
                    <select value={turnoForm.hora} onChange={e=>{setTurnoForm(f=>({...f,hora:e.target.value}));setTurnoErrors(er=>({...er,hora:false}));}} style={{ ...sInp(turnoErrors.hora),flex:1,color:turnoForm.hora?"#f0ede6":"#666",appearance:"none" }}>
                      <option value="">Hora</option>
                      {Array.from({length:((21-9)*4)+4},(_, i)=>{ const min=9*60+i*15; const h=String(Math.floor(min/60)).padStart(2,"0"); const m=String(min%60).padStart(2,"0"); return <option key={i} value={`${h}:${m}`}>{h}:{m}</option>; })}
                    </select>
                  </div>
                  <ClienteInput value={turnoForm.cliente} clientes={clientes} err={turnoErrors.cliente} sInp={sInp} placeholder="Nombre completo del cliente"
                    onChange={v=>{setTurnoForm(f=>({...f,cliente:v}));setTurnoErrors(er=>({...er,cliente:false}));}}
                    onPick={c=>setTurnoForm(f=>({...f,cliente:c.nombre,telefono:c.telefono||f.telefono}))} />
                  <input type="tel" placeholder="Número de teléfono" value={turnoForm.telefono} style={sInp(turnoErrors.telefono)} onChange={e=>{setTurnoForm(f=>({...f,telefono:e.target.value}));setTurnoErrors(er=>({...er,telefono:false}));}} />
                  <select value={turnoForm.barbero} onChange={e=>{setTurnoForm(f=>({...f,barbero:e.target.value}));setTurnoErrors(er=>({...er,barbero:false}));}} style={{ ...sInp(turnoErrors.barbero),color:turnoForm.barbero?"#f0ede6":"#666",appearance:"none" }}>
                    <option value="">Barbero</option>
                    {BARBEROS.map(b=><option key={b} value={b}>{b}</option>)}
                  </select>
                  <div style={{ display:"flex",gap:8 }}>
                    {[{v:false,l:"Solo corte"},{v:true,l:"Con barba"}].map(o=>(
                      <button key={o.l} onClick={()=>setTurnoForm(f=>({...f,barba:o.v}))} style={{ flex:1,padding:"10px 0",borderRadius:8,border:`1.5px solid ${turnoForm.barba===o.v?"#f2efe8":"#2a2a2a"}`,background:turnoForm.barba===o.v?"#1f1d18":"#181818",color:turnoForm.barba===o.v?"#f2efe8":"#888",fontSize:13,fontWeight:600,cursor:"pointer" }}>{o.l}</button>
                    ))}
                  </div>
                  <input placeholder="Nota (opcional)" value={turnoForm.nota} style={sInp(false)} onChange={e=>setTurnoForm(f=>({...f,nota:e.target.value}))} />
                  <button onClick={handleAgregarTurno} style={{ padding:"12px 0",borderRadius:10,border:"none",background:"#f2efe8",color:"#0f0f0f",fontWeight:800,fontSize:15,cursor:"pointer" }}>Agendar</button>
                  {Object.values(turnoErrors).some(Boolean)&&<div style={{ color:"#e05c5c",fontSize:13,textAlign:"center" }}>Completá fecha, hora, cliente, teléfono y barbero.</div>}
                </div>
              </div>

              {/* Controles vista */}
              <div style={{ display:"flex",background:"#181818",borderRadius:8,padding:3,marginBottom:10,border:"1px solid #232323" }}>
                {[{id:"dia",label:"Día"},{id:"semana",label:"Semana"}].map(m=>(
                  <button key={m.id} onClick={()=>setTurnoModo(m.id)} style={{ flex:1,padding:"7px 0",borderRadius:6,border:"none",cursor:"pointer",fontSize:13,fontWeight:600,background:turnoModo===m.id?"#f2efe8":"transparent",color:turnoModo===m.id?"#0f0f0f":"#666" }}>{m.label}</button>
                ))}
              </div>
              <div style={{ display:"flex",gap:8,marginBottom:10,alignItems:"center" }}>
                <input type="date" value={turnoFecha} onChange={e=>setTurnoFecha(e.target.value)} style={{ ...sInp(false),flex:1 }} />
                {turnoModo==="semana"&&<span style={{ fontSize:11,color:"#666" }}>{labelSem}</span>}
              </div>
              {!barberoActivo && (
                <select value={turnoFiltroBarbero} onChange={e=>setTurnoFiltroBarbero(e.target.value)} style={{ ...sInp(false),color:"#f0ede6",appearance:"none",marginBottom:18 }}>
                  <option value="Todos">Todos los barberos</option>
                  {BARBEROS.map(b=><option key={b} value={b}>{b}</option>)}
                </select>
              )}

              {/* Lista */}
              {lista.length===0
                ? <div style={{ textAlign:"center",color:"#555",padding:"40px 0",fontSize:14 }}>No hay turnos {turnoModo==="dia"?"para este día":"esta semana"}.</div>
                : Object.keys(porFecha).sort().map(f=>(
                  <div key={f} style={{ marginBottom:16 }}>
                    {turnoModo==="semana"&&<div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"capitalize",fontWeight:600 }}>{diaNombre(f)} · {formatFecha(f+"T12:00:00")}</div>}
                    {porFecha[f].map(t=>{
                      const hh = horasHasta(t.fecha, t.hora);
                      const proximo = hh >= 0 && hh < 48;
                      return (
                      <div key={t.id} style={{ background:"#141414",borderRadius:10,padding:"12px 14px",border:`1px solid ${proximo?"#3a2e16":"#1e1e1e"}`,marginBottom:8 }}>
                        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                          <div style={{ display:"flex",alignItems:"center",gap:14 }}>
                            <div style={{ fontSize:17,fontWeight:800,color:"#f2efe8",minWidth:52 }}>{t.hora}</div>
                            <div>
                              <div style={{ fontSize:14,fontWeight:600 }}>{t.cliente}</div>
                              <div style={{ fontSize:12,color:"#888" }}>✂️ {t.barbero.split(" ")[0]} · {t.barba?"corte+barba":"corte"}{t.telefono?` · 📞 ${t.telefono}`:""}</div>
                              {t.nota&&<div style={{ fontSize:12,color:"#666",marginTop:2 }}>{t.nota}</div>}
                            </div>
                          </div>
                          <button onClick={()=>setConfirmDeleteTurno(t.id)} style={{ background:"transparent",border:"none",color:"#e05c5c",fontSize:16,cursor:"pointer",lineHeight:1 }}>✕</button>
                        </div>
                        {proximo && esAdmin && (
                          <div style={{ marginTop:8,padding:"6px 10px",background:"rgba(176,154,120,0.12)",borderRadius:6,fontSize:11.5,color:"#b09a78" }}>
                            ⏰ Faltan menos de 48 hs — {ADMIN_NOMBRE.split(" ")[0]}, recordá enviar el WhatsApp
                          </div>
                        )}
                        <div style={{ display:"flex",gap:8,marginTop:10 }}>
                          <a href={waLink(t)} target="_blank" rel="noopener noreferrer" style={{ flex:1,textAlign:"center",textDecoration:"none",padding:"8px 0",borderRadius:8,background:"#1e3324",color:"#7ec87e",fontSize:12.5,fontWeight:700 }}>💬 WhatsApp</a>
                          {esAdmin && <button onClick={()=>turnoACorte(t)} style={{ flex:1,padding:"8px 0",borderRadius:8,border:"none",background:"#2a2a2a",color:"#f0ede6",fontSize:12.5,fontWeight:700,cursor:"pointer" }}>→ Corte</button>}
                        </div>
                      </div>
                    );})}
                  </div>
                ))
              }
            </div>
          );
        })()}

        {/* ── PDC SCORE ── */}
        {vista === "score" && (
          <div style={{ paddingTop:24 }}>
            <div style={{ fontSize:16,fontWeight:700,marginBottom:4,color:"#f2efe8" }}>PDC Score</div>
            <div style={{ fontSize:12,color:"#666",marginBottom:16 }}>Reconoce a quienes mejor representan la cultura PDC</div>

            {/* Toggle total / semana */}
            <div style={{ display:"flex",background:"#181818",borderRadius:8,padding:3,marginBottom:18,border:"1px solid #232323" }}>
              {[{id:"total",label:"Acumulado"},{id:"semana",label:"Esta semana"}].map(m=>(
                <button key={m.id} onClick={()=>setScoreModo(m.id)} style={{ flex:1,padding:"7px 0",borderRadius:6,border:"none",cursor:"pointer",fontSize:13,fontWeight:600,background:scoreModo===m.id?"#f2efe8":"transparent",color:scoreModo===m.id?"#0f0f0f":"#666" }}>{m.label}</button>
              ))}
            </div>

            {/* Ranking */}
            {(() => {
              const ranking = [...SCORE_PERSONAS].map(p=>({ persona:p, pts:puntosPersona(p) })).sort((a,b)=>b.pts-a.pts);
              const max = Math.max(1, ...ranking.map(r=>r.pts));
              const medalla = ["🥇","🥈","🥉"];
              return (
                <div style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:28 }}>
                  {ranking.map((r,i)=>(
                    <div key={r.persona} style={{ background:"#141414",borderRadius:12,padding:"14px 16px",border:"1px solid #1e1e1e" }}>
                      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8 }}>
                        <span style={{ fontSize:14,fontWeight:600 }}>{r.pts>0&&i<3?medalla[i]+" ":""}{r.persona}</span>
                        <span style={{ fontSize:20,fontWeight:800,color:"#f2efe8" }}>{r.pts}</span>
                      </div>
                      <div style={{ height:6,background:"#232323",borderRadius:3,overflow:"hidden" }}>
                        <div style={{ height:"100%",width:`${(r.pts/max)*100}%`,background:"#f2efe8",borderRadius:3,transition:"width 0.3s" }} />
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* Cargar punto */}
            <div style={{ background:"#141414",borderRadius:12,padding:16,marginBottom:24,border:"1px solid #232323" }}>
              <div style={{ fontSize:14,fontWeight:700,marginBottom:14,color:"#f2efe8" }}>Cargar punto</div>
              <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                <select value={scorePersona} onChange={e=>{setScorePersona(e.target.value);setScoreCat("");}} style={{ ...sInp(false),color:scorePersona?"#f0ede6":"#666",appearance:"none" }}>
                  <option value="">¿A quién?</option>
                  {SCORE_PERSONAS.map(p=><option key={p} value={p}>{p}</option>)}
                </select>
                {scorePersona && (
                  <select value={scoreCat} onChange={e=>setScoreCat(e.target.value)} style={{ ...sInp(false),color:scoreCat?"#f0ede6":"#666",appearance:"none" }}>
                    <option value="">Categoría</option>
                    {catsDisponibles(scorePersona).map(c=><option key={c.t} value={c.t}>⭐ {c.t} ({c.pts} pto{c.pts!==1?"s":""}){c.unica?" · única vez":""}</option>)}
                  </select>
                )}
                {scorePersona && scoreCat && (
                  <textarea placeholder="Detalle (opcional)" value={scoreNota} onChange={e=>setScoreNota(e.target.value)} rows={2} style={{ ...sInp(false),resize:"vertical" }} />
                )}
                <button onClick={handleAgregarScore} disabled={!scorePersona||!scoreCat} style={{ padding:"12px 0",borderRadius:10,border:"none",background:(!scorePersona||!scoreCat)?"#2a2a2a":"#f2efe8",color:(!scorePersona||!scoreCat)?"#555":"#0f0f0f",fontWeight:800,fontSize:15,cursor:(!scorePersona||!scoreCat)?"not-allowed":"pointer" }}>{scorePersona&&scoreCat?`Sumar ${puntosDeCat(scorePersona,scoreCat)} pto${puntosDeCat(scorePersona,scoreCat)!==1?"s":""}`:"Sumar punto"}</button>
                <div style={{ fontSize:11,color:"#555",textAlign:"center" }}>Los puntos los define la categoría.</div>
              </div>
            </div>

            {/* Administrar categorías */}
            <div style={{ background:"#141414",borderRadius:12,padding:16,marginBottom:24,border:"1px solid #232323" }}>
              <div style={{ fontSize:14,fontWeight:700,marginBottom:4,color:"#f2efe8" }}>Administrar categorías</div>
              <div style={{ fontSize:11,color:"#666",marginBottom:14 }}>Editá los puntos, borrá o agregá. Pocas y claras.</div>
              {[{g:"barbero",label:"Barberos"},{g:"recepcion",label:"Recepción / Admin"}].map(grp=>(
                <div key={grp.g} style={{ marginBottom:16 }}>
                  <div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"uppercase",letterSpacing:1 }}>{grp.label}</div>
                  {cats[grp.g].map((c,i)=>(
                    <div key={i} style={{ marginBottom:8 }}>
                      <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                        <span style={{ flex:1,fontSize:13 }}>⭐ {c.t}</span>
                        <input type="number" value={c.pts} onChange={e=>editarCatPts(grp.g,i,e.target.value)} style={{ ...sInp(false),width:56,padding:"6px 8px",textAlign:"center" }} />
                        <button onClick={()=>borrarCat(grp.g,i)} style={{ background:"transparent",border:"none",color:"#e05c5c",fontSize:15,cursor:"pointer" }}>✕</button>
                      </div>
                      <button onClick={()=>toggleCatUnica(grp.g,i)} style={{ marginTop:4,background:"transparent",border:"none",color:c.unica?"#b09a78":"#666",fontSize:11,cursor:"pointer",padding:0 }}>
                        {c.unica?"◆ Única vez":"◇ Permanente"} · cambiar
                      </button>
                    </div>
                  ))}
                  <NuevaCat grupo={grp.g} onAdd={agregarCat} sInp={sInp} />
                </div>
              ))}
            </div>

            {/* Historial de puntos */}
            <div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"uppercase",letterSpacing:1 }}>
              {scoreModo==="total"?"Todos los registros":"Registros de esta semana"}
            </div>
            {scoresFiltrados().length===0
              ? <div style={{ textAlign:"center",color:"#555",padding:"30px 0",fontSize:14 }}>Sin registros todavía.</div>
              : scoresFiltrados().map(s=>(
                <div key={s.id} style={{ background:"#141414",borderRadius:10,padding:"12px 14px",border:"1px solid #1e1e1e",marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14,fontWeight:600 }}>{s.persona.split(" ")[0]} <span style={{ color:"#f2efe8",fontWeight:800 }}>+{s.puntos}</span></div>
                    <div style={{ fontSize:12,color:"#666" }}>⭐ {s.categoria} · {formatFecha(s.fecha)}</div>
                    {s.nota&&<div style={{ fontSize:12,color:"#888",marginTop:2,fontStyle:"italic" }}>{s.nota}</div>}
                  </div>
                  <button onClick={()=>setConfirmDeleteScore(s.id)} style={{ background:"transparent",border:"none",color:"#444",fontSize:12,cursor:"pointer" }}>🗑</button>
                </div>
              ))
            }
          </div>
        )}

        {/* ── CLIENTES (admin) ── */}
        {vista === "clientes" && esAdmin && (() => {
          // unificar clientes de la libreta + los que aparecen en cortes
          const nombres = new Set(clientes.map(c=>c.nombre));
          cortes.forEach(c=>nombres.add(c.cliente));
          turnos.forEach(t=>nombres.add(t.cliente));
          let lista = [...nombres].filter(Boolean).sort((a,b)=>a.localeCompare(b));
          const q = clienteBuscar.trim().toLowerCase();
          if (q) lista = lista.filter(n=>n.toLowerCase().includes(q));
          return (
            <div style={{ paddingTop:20 }}>
              <div style={{ fontSize:16,fontWeight:700,marginBottom:14,color:"#f2efe8" }}>Clientes</div>
              <input placeholder="Buscar cliente…" value={clienteBuscar} onChange={e=>setClienteBuscar(e.target.value)} style={{ ...sInp(false),marginBottom:16 }} />
              {lista.length===0
                ? <div style={{ textAlign:"center",color:"#555",padding:"40px 0",fontSize:14 }}>{q?"Sin coincidencias.":"Todavía no hay clientes."}</div>
                : lista.map(n=>(
                  <ClienteCard key={n} nombre={n} telefono={telDeCliente(n)} servicios={serviciosDeCliente(n)}
                    abierto={clienteDetalle===n} onToggle={()=>setClienteDetalle(clienteDetalle===n?null:n)}
                    onAgendar={()=>agendarParaCliente(n,telDeCliente(n))}
                    fmt={fmt} formatFecha={formatFecha} waCliente={waCliente} />
                ))
              }
            </div>
          );
        })()}

        {/* ── MIS CLIENTES Y PASES (barbero) ── */}
        {vista === "misclientes" && barberoActivo && (() => {
          const nombres = new Set();
          cortes.filter(c=>c.barbero===barberoActivo).forEach(c=>nombres.add(c.cliente));
          let lista = [...nombres].filter(Boolean).sort((a,b)=>a.localeCompare(b));
          const q = clienteBuscar.trim().toLowerCase();
          if (q) lista = lista.filter(n=>n.toLowerCase().includes(q));
          const misPasesActivos = pases.filter(p=>p.barbero===barberoActivo && horasHasta(p.vence.slice(0,10),"23:59")>=0);
          return (
            <div style={{ paddingTop:20 }}>
              <div style={{ fontSize:16,fontWeight:700,marginBottom:14,color:"#f2efe8" }}>Mis clientes y membresías</div>

              <div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"uppercase",letterSpacing:1 }}>Membresías activas</div>
              {misPasesActivos.length===0
                ? <div style={{ color:"#555",fontSize:14,padding:"6px 0 16px" }}>No tenés membresías activas.</div>
                : misPasesActivos.map(p=>{
                  const tel = telDeCliente(p.cliente);
                  return (
                    <div key={p.id} style={{ background:"#141414",borderRadius:10,padding:"12px 14px",border:"1px solid #1e2a1e",marginBottom:8 }}>
                      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                        <div><div style={{ fontSize:14,fontWeight:600 }}>{p.cliente}</div><div style={{ fontSize:12,color:"#888" }}>{p.tipo} · {p.visitas.length} visita{p.visitas.length!==1?"s":""} · vence {formatFecha(p.vence)}</div></div>
                        {tel && <a href={waCliente(p.cliente,tel)} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none",padding:"6px 12px",borderRadius:8,background:"#1e3324",color:"#7ec87e",fontSize:12,fontWeight:700 }}>💬</a>}
                      </div>
                      <div style={{ display:"flex",gap:8,marginTop:10 }}>
                        <select value={visitaBarbero[p.id]||barberoActivo} onChange={e=>setVisitaBarbero(v=>({...v,[p.id]:e.target.value}))} style={{ ...sInp(false),flex:1,color:"#f0ede6",appearance:"none",padding:"7px 10px" }}>
                          {BARBEROS.map(b=><option key={b} value={b}>{b}{b===p.barbero?" (titular)":""}</option>)}
                        </select>
                        <input type="number" placeholder="Propina" value={visitaPropina[p.id]||""} onChange={e=>setVisitaPropina(v=>({...v,[p.id]:e.target.value}))} style={{ ...sInp(false),width:90,padding:"7px 10px" }} />
                        <button onClick={()=>handleRegistrarVisita(p.id)} style={{ padding:"0 14px",borderRadius:8,border:"none",background:"#7ec87e",color:"#0f0f0f",fontWeight:700,fontSize:12,cursor:"pointer",whiteSpace:"nowrap" }}>+ Visita</button>
                      </div>
                    </div>
                  );
                })
              }

              <div style={{ fontSize:12,color:"#888",margin:"18px 0 10px",textTransform:"uppercase",letterSpacing:1 }}>Clientes que atendí</div>
              <input placeholder="Buscar cliente…" value={clienteBuscar} onChange={e=>setClienteBuscar(e.target.value)} style={{ ...sInp(false),marginBottom:14 }} />
              {lista.length===0
                ? <div style={{ textAlign:"center",color:"#555",padding:"30px 0",fontSize:14 }}>{q?"Sin coincidencias.":"Todavía no atendiste clientes."}</div>
                : lista.map(n=>(
                  <ClienteCard key={n} nombre={n} telefono={telDeCliente(n)} servicios={serviciosDeCliente(n).filter(c=>c.barbero===barberoActivo)}
                    abierto={clienteDetalle===n} onToggle={()=>setClienteDetalle(clienteDetalle===n?null:n)}
                    onAgendar={()=>agendarParaCliente(n,telDeCliente(n))}
                    fmt={fmt} formatFecha={formatFecha} waCliente={waCliente} />
                ))
              }
            </div>
          );
        })()}

        {/* ── APROBACIONES (admin) ── */}
        {vista === "aprobaciones" && esAdmin && (
          <div style={{ paddingTop:24 }}>
            <div style={{ fontSize:16,fontWeight:700,marginBottom:4,color:"#f2efe8" }}>Aprobaciones</div>
            <div style={{ fontSize:12,color:"#666",marginBottom:20 }}>Cortes y puntos solicitados por barberos</div>
            {pendientes.length===0
              ? <div style={{ textAlign:"center",color:"#555",padding:"40px 0",fontSize:14 }}>No hay nada pendiente. ✓</div>
              : pendientes.map(p=>(
                <div key={p.id} style={{ background:"#141414",borderRadius:12,padding:16,border:"1px solid #3a2e16",marginBottom:10 }}>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10 }}>
                    <div>
                      <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4 }}>
                        <span style={{ fontSize:11,background:p.kind==="corte"?"#16242e":p.kind==="membresia"?"#1e2630":"#1f1d18",color:p.kind==="corte"?"#5a9fd4":p.kind==="membresia"?"#5a9fd4":"#b09a78",borderRadius:4,padding:"2px 7px",fontWeight:700 }}>{p.kind==="corte"?"CORTE":p.kind==="membresia"?"MEMBRESÍA":"PUNTO PDC"}</span>
                        <span style={{ fontSize:13,fontWeight:600 }}>{p.solicitante?.split(" ")[0]}</span>
                      </div>
                      {p.kind==="corte"
                        ? <div style={{ fontSize:13,color:"#aaa" }}>{p.data.cliente} · {p.data.servicio} · {fmt(p.data.monto)} ({p.data.medioPago}){p.data.propina?` · propina ${fmt(p.data.propina)}`:""}</div>
                        : p.kind==="membresia"
                        ? <div style={{ fontSize:13,color:"#aaa" }}>{p.data.cliente} · {p.data.tipo} · {fmt(p.data.monto)} ({p.data.medioPago})</div>
                        : <div style={{ fontSize:13,color:"#aaa" }}>⭐ {p.data.categoria} · {p.data.puntos} pto{p.data.puntos!==1?"s":""}{p.data.nota?` · ${p.data.nota}`:""}</div>
                      }
                    </div>
                  </div>
                  <div style={{ display:"flex",gap:8 }}>
                    <button onClick={()=>rechazarPendiente(p.id)} style={{ flex:1,padding:"9px 0",borderRadius:8,border:"1px solid #3a1e1e",background:"transparent",color:"#e05c5c",fontSize:13,fontWeight:700,cursor:"pointer" }}>Rechazar</button>
                    <button onClick={()=>aprobarPendiente(p.id)} style={{ flex:1,padding:"9px 0",borderRadius:8,border:"none",background:"#7ec87e",color:"#0f0f0f",fontSize:13,fontWeight:700,cursor:"pointer" }}>Aprobar</button>
                  </div>
                </div>
              ))
            }
          </div>
        )}

        {/* ── MI PANEL (barbero) ── */}
        {/* ── BARBERO: RESUMEN ── */}
        {vista === "barbero" && barberoActivo && (() => {
          const cor = comisionCortesBarbero(barberoActivo);
          const mem = comisionMembresiaBarbero(barberoActivo);
          const misCortes = cortes.filter(c=>c.barbero===barberoActivo);
          const misPendientes = pendientes.filter(p=>p.solicitante===barberoActivo);
          const miScore = scores.filter(s=>s.persona===barberoActivo).reduce((a,s)=>a+s.puntos,0);
          const finManana = (()=>{ const d=new Date(); d.setDate(d.getDate()+1); return d.toISOString().slice(0,10); })();
          const misTurnos = turnos.filter(t=>t.barbero===barberoActivo && (t.fecha===hoy()||t.fecha===finManana)).sort((a,b)=>(a.fecha+a.hora).localeCompare(b.fecha+b.hora));
          return (
            <div style={{ paddingTop:24 }}>
              <div style={{ fontSize:16,fontWeight:700,marginBottom:16,color:"#f2efe8" }}>Hola, {barberoActivo.split(" ")[0]} 👋</div>

              {/* Saldo */}
              <div style={{ background:"#141414",borderRadius:12,padding:16,marginBottom:16,border:"1px solid #2a2218" }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                  <div><div style={{ fontSize:13,color:"#888" }}>Por cobrar (cortes + cuotas vencidas)</div><div style={{ fontSize:11,color:"#555",marginTop:2 }}>Total con todo lo por vencer: {fmt(cor.pendiente+mem.totalPendiente)}</div></div>
                  <div style={{ fontSize:24,fontWeight:800,color:"#f2efe8" }}>{fmt(cor.pendiente+mem.vencidoPendiente)}</div>
                </div>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:24 }}>
                <div style={{ background:"#141414",borderRadius:12,padding:14,border:"1px solid #1e1e1e" }}><div style={{ fontSize:12,color:"#888",marginBottom:4 }}>Mis cortes</div><div style={{ fontSize:18,fontWeight:800 }}>{misCortes.length}</div></div>
                <div style={{ background:"#141414",borderRadius:12,padding:14,border:"1px solid #1e1e1e" }}><div style={{ fontSize:12,color:"#888",marginBottom:4 }}>Mi PDC Score</div><div style={{ fontSize:18,fontWeight:800,color:"#f2efe8" }}>{miScore}</div></div>
              </div>

              {/* Turnos hoy / mañana */}
              <div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"uppercase",letterSpacing:1 }}>Mis turnos hoy y mañana</div>
              {misTurnos.length===0
                ? <div style={{ color:"#555",fontSize:14,padding:"6px 0 16px" }}>No tenés turnos para hoy ni mañana.</div>
                : misTurnos.map(t=>(
                  <div key={t.id} style={{ background:"#141414",borderRadius:10,padding:"10px 14px",border:`1px solid ${t.fecha===hoy()?"#3a2e16":"#1e1e1e"}`,marginBottom:6,display:"flex",alignItems:"center",gap:12 }}>
                    <div style={{ textAlign:"center",minWidth:54 }}>
                      <div style={{ fontSize:11,color:"#888" }}>{t.fecha===hoy()?"Hoy":"Mañana"}</div>
                      <div style={{ fontSize:15,fontWeight:800,color:"#f2efe8" }}>{t.hora}</div>
                    </div>
                    <div style={{ flex:1 }}><div style={{ fontSize:14,fontWeight:600 }}>{t.cliente}</div><div style={{ fontSize:12,color:"#888" }}>{t.barba?"corte+barba":"corte"}</div></div>
                  </div>
                ))
              }

              {/* Mis pendientes */}
              {misPendientes.length>0 && (
                <div style={{ marginTop:20 }}>
                  <div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"uppercase",letterSpacing:1 }}>Esperando aprobación</div>
                  {misPendientes.map(p=>(
                    <div key={p.id} style={{ background:"#141414",borderRadius:8,padding:"10px 14px",border:"1px solid #3a2e16",marginBottom:6,fontSize:13,color:"#b09a78" }}>
                      {p.kind==="corte"?`Corte · ${p.data.cliente} · ${fmt(p.data.monto)}`:p.kind==="membresia"?`Membresía · ${p.data.cliente} · ${p.data.tipo}`:`Punto · ${p.data.categoria}`}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })()}

        {/* ── BARBERO: CARGAR ── */}
        {vista === "bcargar" && barberoActivo && (
          <div style={{ paddingTop:24 }}>
            {/* Cargar corte (pendiente) */}
            <div style={{ background:"#141414",borderRadius:12,padding:16,marginBottom:16,border:"1px solid #232323" }}>
              <div style={{ fontSize:14,fontWeight:700,marginBottom:4,color:"#f2efe8" }}>Cargar corte</div>
              <div style={{ fontSize:11,color:"#666",marginBottom:12 }}>Queda pendiente hasta que {ADMIN_NOMBRE.split(" ")[0]} lo apruebe.</div>
              <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                <Sel field="servicio" options={SERVICIOS} placeholder="Tipo de servicio" value={form.servicio} errs={errors} onChange={e=>{setForm(f=>({...f,servicio:e.target.value}));setErrors(er=>({...er,servicio:false}));}} />
                <ClienteInput value={form.cliente} clientes={clientes} err={errors.cliente} sInp={sInp}
                  onChange={v=>{setForm(f=>({...f,cliente:v}));setErrors(er=>({...er,cliente:false}));}}
                  onPick={c=>setForm(f=>({...f,cliente:c.nombre,telefono:c.telefono||f.telefono}))} />
                <input type="tel" placeholder="Teléfono (opcional)" value={form.telefono} style={sInp(false)} onChange={e=>setForm(f=>({...f,telefono:e.target.value}))} />
                <Sel field="medioPago" options={MEDIOS_PAGO} placeholder="Medio de pago" value={form.medioPago} errs={errors} onChange={e=>{setForm(f=>({...f,medioPago:e.target.value}));setErrors(er=>({...er,medioPago:false}));}} />
                <div style={{ display:"flex",gap:10 }}>
                  <input placeholder="Monto ($)" type="number" value={form.monto} style={{...sInp(errors.monto),flex:1}} onChange={e=>{setForm(f=>({...f,monto:e.target.value}));setErrors(er=>({...er,monto:false}));}} />
                  <input placeholder="Propina" type="number" value={form.propina} style={{...sInp(false),flex:1}} onChange={e=>setForm(f=>({...f,propina:e.target.value}))} />
                </div>
                <button onClick={()=>{ const e={}; if(!form.servicio)e.servicio=true; if(!form.cliente.trim())e.cliente=true; if(!form.medioPago)e.medioPago=true; if(!form.monto||Number(form.monto)<=0)e.monto=true; if(Object.keys(e).length){setErrors(e);return;} solicitarCorte({ servicio:form.servicio, cliente:form.cliente.trim(), telefono:form.telefono.trim(), barbero:barberoActivo, medioPago:form.medioPago, monto:form.monto, propina:form.propina }); setForm(initialForm); setErrors({}); }} style={{ padding:"12px 0",borderRadius:10,border:"none",background:"#f2efe8",color:"#0f0f0f",fontWeight:800,fontSize:15,cursor:"pointer" }}>Enviar a aprobación</button>
              </div>
            </div>

            {/* Vender membresía (pendiente) */}
            <div style={{ background:"#141414",borderRadius:12,padding:16,marginBottom:16,border:"1px solid #232323" }}>
              <div style={{ fontSize:14,fontWeight:700,marginBottom:4,color:"#f2efe8" }}>Vender membresía</div>
              <div style={{ fontSize:11,color:"#666",marginBottom:12 }}>Queda pendiente hasta que {ADMIN_NOMBRE.split(" ")[0]} la apruebe.</div>
              <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                <ClienteInput value={paseForm.cliente} clientes={clientes} err={paseErrors.cliente} sInp={sInp}
                  onChange={v=>{setPaseForm(f=>({...f,cliente:v}));setPaseErrors(er=>({...er,cliente:false}));}}
                  onPick={c=>setPaseForm(f=>({...f,cliente:c.nombre,telefono:c.telefono||f.telefono}))} />
                <input type="tel" placeholder="Teléfono" value={paseForm.telefono} style={sInp(paseErrors.telefono)} onChange={e=>{setPaseForm(f=>({...f,telefono:e.target.value}));setPaseErrors(er=>({...er,telefono:false}));}} />
                <select value={paseForm.tipo} onChange={e=>{setPaseForm(f=>({...f,tipo:e.target.value}));setPaseErrors(er=>({...er,tipo:false}));}} style={{ ...sInp(paseErrors.tipo),color:paseForm.tipo?"#f0ede6":"#666",appearance:"none" }}>
                  <option value="">Tipo de membresía</option>
                  {TIPOS_PASE.map(t=><option key={t} value={t}>{t}</option>)}
                </select>
                <select value={paseForm.medioPago} onChange={e=>{setPaseForm(f=>({...f,medioPago:e.target.value}));setPaseErrors(er=>({...er,medioPago:false}));}} style={{ ...sInp(paseErrors.medioPago),color:paseForm.medioPago?"#f0ede6":"#666",appearance:"none" }}>
                  <option value="">Medio de pago</option>
                  {MEDIOS_PAGO.map(m=><option key={m} value={m}>{m}</option>)}
                </select>
                <input placeholder="Monto cobrado ($)" type="number" value={paseForm.monto} style={sInp(paseErrors.monto)} onChange={e=>{setPaseForm(f=>({...f,monto:e.target.value}));setPaseErrors(er=>({...er,monto:false}));}} />
                {paseForm.tipo && <div style={{ background:"#181818",border:"1px solid #2a2a2a",borderRadius:8,padding:"10px 12px",fontSize:12,color:"#888" }}>Vence en {PASE_CONFIG[paseForm.tipo].dias} días · vos titular de la membresía</div>}
                <button onClick={()=>{ const e={}; if(!paseForm.cliente.trim())e.cliente=true; if(!paseForm.telefono.trim())e.telefono=true; if(!paseForm.tipo)e.tipo=true; if(!paseForm.medioPago)e.medioPago=true; if(!paseForm.monto||Number(paseForm.monto)<=0)e.monto=true; if(Object.keys(e).length){setPaseErrors(e);return;} solicitarMembresia({ cliente:paseForm.cliente.trim(), telefono:paseForm.telefono.trim(), tipo:paseForm.tipo, barbero:barberoActivo, medioPago:paseForm.medioPago, monto:paseForm.monto }); setPaseForm(initialPaseForm); setPaseErrors({}); }} style={{ padding:"12px 0",borderRadius:10,border:"none",background:"#f2efe8",color:"#0f0f0f",fontWeight:800,fontSize:15,cursor:"pointer" }}>Enviar a aprobación</button>
              </div>
            </div>
          </div>
        )}

        {/* ── BARBERO: MI SCORE ── */}
        {vista === "bscore" && barberoActivo && (() => {
          const miScore = scores.filter(s=>s.persona===barberoActivo).reduce((a,s)=>a+s.puntos,0);
          const misRegistros = scores.filter(s=>s.persona===barberoActivo);
          return (
            <div style={{ paddingTop:24 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6 }}>
                <div style={{ fontSize:16,fontWeight:700,color:"#f2efe8" }}>Mi Score PDC</div>
                <div style={{ fontSize:18,fontWeight:800,color:"#f2efe8" }}>{miScore} pts</div>
              </div>
              <div style={{ fontSize:11,color:"#666",marginBottom:14 }}>Tocá un logro que hayas hecho para solicitarlo. Lo aprueba {ADMIN_NOMBRE.split(" ")[0]}.</div>
              {catsDisponibles(barberoActivo).length===0
                ? <div style={{ color:"#555",fontSize:14,padding:"6px 0 16px" }}>No quedan logros disponibles.</div>
                : catsDisponibles(barberoActivo).map(c=>{
                  const yaPedido = pendientes.some(p=>p.kind==="score"&&p.solicitante===barberoActivo&&p.data.categoria===c.t);
                  return (
                    <button key={c.t} disabled={yaPedido} onClick={()=>setConfirmSolicitud(c)} style={{ width:"100%",textAlign:"left",background:"#141414",border:"1px solid #1e1e1e",borderRadius:10,padding:"12px 14px",marginBottom:8,cursor:yaPedido?"default":"pointer",opacity:yaPedido?0.5:1,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                      <div>
                        <div style={{ fontSize:14,fontWeight:600,color:"#f0ede6" }}>⭐ {c.t}</div>
                        <div style={{ fontSize:11,color:"#666",marginTop:2 }}>{c.pts} pto{c.pts!==1?"s":""}{c.unica?" · única vez":""}{yaPedido?" · ya solicitado":""}</div>
                      </div>
                      {!yaPedido && <span style={{ fontSize:13,fontWeight:800,color:"#7ec87e" }}>+{c.pts}</span>}
                    </button>
                  );
                })
              }
              {misRegistros.length>0 && (
                <div style={{ marginTop:20 }}>
                  <div style={{ fontSize:12,color:"#888",marginBottom:8,textTransform:"uppercase",letterSpacing:1 }}>Mis logros aprobados</div>
                  {misRegistros.map(s=>(
                    <div key={s.id} style={{ background:"#141414",borderRadius:8,padding:"10px 14px",border:"1px solid #1e1e1e",marginBottom:6,display:"flex",justifyContent:"space-between" }}>
                      <span style={{ fontSize:13 }}>⭐ {s.categoria}</span>
                      <span style={{ fontSize:13,fontWeight:700,color:"#7ec87e" }}>+{s.puntos}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })()}

        {/* ── BARBERO: HISTORIAL ── */}
        {vista === "bhistorial" && barberoActivo && (() => {
          const misCortes = cortes.filter(c=>c.barbero===barberoActivo);
          return (
            <div style={{ paddingTop:24 }}>
              <div style={{ fontSize:16,fontWeight:700,marginBottom:14,color:"#f2efe8" }}>Mi historial de cortes</div>
              {misCortes.length===0
                ? <div style={{ color:"#555",fontSize:14,padding:"6px 0" }}>Sin cortes registrados.</div>
                : misCortes.map(c=>(
                  <div key={c.id} style={{ background:"#141414",borderRadius:8,padding:"10px 14px",border:"1px solid #1e1e1e",marginBottom:6,display:"flex",justifyContent:"space-between" }}>
                    <div><div style={{ fontSize:14,fontWeight:600 }}>{c.cliente}</div><div style={{ fontSize:12,color:"#666" }}>{c.servicio} · {formatFecha(c.fecha)}</div></div>
                    <div style={{ textAlign:"right" }}><div style={{ fontSize:14,fontWeight:700,color:"#b09a78" }}>{fmt(c.comision||0)}</div></div>
                  </div>
                ))
              }
            </div>
          );
        })()}

      </div>
    </div>
  );
}
