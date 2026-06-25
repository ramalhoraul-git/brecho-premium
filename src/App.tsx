import { useEffect, useMemo, useState } from 'react'
import {
  Search, ShoppingBag, User2, Heart, Menu, X, ChevronRight, ShieldCheck, Sparkles, BadgeCheck,
  Star, ChevronLeft, Trash2, LayoutDashboard, Archive, Package,
  Users, FileText, HandCoins, CircleDollarSign, BarChart3, Megaphone, Shield, Printer,
  Database, QrCode, Barcode, Tags, CreditCard, ArrowUpRight,
  ArrowDownRight, Bell, RefreshCw, Zap, CheckCircle2, AlertTriangle, Clock3, Camera as CameraIcon
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'

type Condition = 'Premium'|'Excelente'|'Muito Bom'|'Bom'|'Outlet'|'Consignado'
type Product = {
  id: string
  name: string
  brand: string
  category: string
  sub: string
  price: number
  compareAt?: number
  size: string
  color: string
  condition: Condition
  image: string
  images?: string[]
  featured?: boolean
  new?: boolean
  stock: number
  cost?: number
  vendor?: string
  consignado?: boolean
}

const PRODUCTS: Product[] = [
  {
    id:'CUR-1182',
    name:'Vestido Midi Drapê Em Seda',
    brand:'Céline · Archive',
    category:'Feminino',
    sub:'Vestidos',
    price: 480,
    compareAt: 1290,
    size:'M · 40',
    color:'Verde Oliva',
    condition:'Premium',
    image:'https://images.pexels.com/photos/36679410/pexels-photo-36679410.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
    featured:true, new:true, stock:1, cost:145, vendor:'Forn. 0182'
  },
  {
    id:'CUR-1183',
    name:'Blazer Estruturado Lã Fria',
    brand:'The Row',
    category:'Feminino',
    sub:'Jaquetas',
    price: 690,
    compareAt: 2100,
    size:'P · 38',
    color:'Carvão',
    condition:'Excelente',
    image:'https://images.pexels.com/photos/20235969/pexels-photo-20235969.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
    featured:true, stock:1, cost:260
  },
  {
    id:'CUR-1184',
    name:'Vestido Poá Anos 60',
    brand:'Zimmermann',
    category:'Feminino',
    sub:'Vestidos',
    price: 340,
    size:'M · 40',
    color:'Preto/Off',
    condition:'Muito Bom',
    image:'https://images.pexels.com/photos/33669432/pexels-photo-33669432.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
    new:true, stock:1, cost:120
  },
  {
    id:'CUR-1185',
    name:'Chemise Linho Natural',
    brand:'Totême',
    category:'Feminino',
    sub:'Blusas',
    price: 290,
    compareAt: 850,
    size:'Único',
    color:'Areia',
    condition:'Premium',
    image:'https://images.pexels.com/photos/37111522/pexels-photo-37111522.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
    featured:true, stock:1, cost:95
  },
  {
    id:'CUR-1186',
    name:'Vestido Slip Vintage Verde',
    brand:'Acne Studios',
    category:'Feminino',
    sub:'Moda Festa',
    price: 420,
    size:'P',
    color:'Sage',
    condition:'Excelente',
    image:'https://images.pexels.com/photos/20310510/pexels-photo-20310510.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
    stock:1, cost:138, consignado:true
  },
  {
    id:'CUR-1187',
    name:'Conjunto Três Peças Manor',
    brand:'Maison Curá',
    category:'Feminino',
    sub:'Moda Festa',
    price: 890,
    compareAt: 3200,
    size:'M',
    color:'Marfim',
    condition:'Premium',
    image:'https://images.pexels.com/photos/34922839/pexels-photo-34922839.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
    featured:true, stock:1, cost:310
  },
  {
    id:'CUR-1188',
    name:'Jaqueta Cropped Sarja',
    brand:'Isabel Marant',
    category:'Feminino',
    sub:'Jaquetas',
    price: 395,
    size:'38',
    color:'Café',
    condition:'Muito Bom',
    image:'https://images.pexels.com/photos/6069979/pexels-photo-6069979.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
    stock:1, cost:148, new:true
  },
  {
    id:'CUR-1189',
    name:'Vestido Floral Boutique',
    brand:'Ulla Johnson',
    category:'Feminino',
    sub:'Vestidos',
    price: 318,
    compareAt: 980,
    size:'M',
    color:'Floral Vintage',
    condition:'Bom',
    image:'https://images.pexels.com/photos/31349843/pexels-photo-31349843.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
    stock:1, cost:95, consignado:true
  },
  {
    id:'CUR-1190',
    name:'Camisa Social Masculina Oxford',
    brand:'Dries Van Noten',
    category:'Masculino',
    sub:'Camisas',
    price: 210,
    size:'G',
    color:'Azul Marinho',
    condition:'Excelente',
    image:'https://images.pexels.com/photos/27230004/pexels-photo-27230004.png?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
    stock:2, cost:78
  },
  {
    id:'CUR-1191',
    name:'Bolsa Couro Legítimo',
    brand:'Mansur Gavriel',
    category:'Acessórios',
    sub:'Bolsas',
    price: 520,
    compareAt: 1550,
    size:'Único',
    color:'Corda',
    condition:'Premium',
    image:'https://images.pexels.com/photos/20251644/pexels-photo-20251644.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
    featured:true, stock:1, cost:190
  },
  {
    id:'CUR-1192',
    name:'Óculos Oversized Acetato',
    brand:'Jacquemus',
    category:'Acessórios',
    sub:'Óculos',
    price: 260,
    size:'Único',
    color:'Havana',
    condition:'Excelente',
    image:'https://images.pexels.com/photos/17040865/pexels-photo-17040865.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
    stock:1, cost:88
  },
  {
    id:'CUR-1193',
    name:'Casaco Lã Curadoria Inverno',
    brand:'Lemaire',
    category:'Feminino',
    sub:'Jaquetas',
    price: 610,
    compareAt: 1850,
    size:'M',
    color:'Camel',
    condition:'Premium',
    image:'https://images.pexels.com/photos/35714493/pexels-photo-35714493.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
    stock:1, cost:210, new:true
  },
]

const storeNav = [
  {label:'Feminino',subs:['Vestidos','Saias','Blusas','Calças','Shorts','Jaquetas','Moda Festa']},
  {label:'Masculino',subs:['Camisas','Camisetas','Calças','Bermudas','Jaquetas','Social']},
  {label:'Infantil',subs:['Menina Roupas','Menino Roupas','Calçados','Acessórios']},
  {label:'Calçados',subs:['Feminino','Masculino','Infantil']},
  {label:'Acessórios',subs:['Bolsas','Cintos','Bijuterias','Joias','Relógios','Óculos']},
]

const brl = (n:number)=> n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})
const conditionMeta: Record<Condition,{color:string; bg:string; border:string; desc:string}> = {
  Premium:{color:'#132117',bg:'#e9f3ee',border:'#b6d9c7',desc:'Peça única ou raríssima'},
  Excelente:{color:'#132117',bg:'#f1f1ea',border:'#d7d5c7',desc:'Sinais quase invisíveis'},
  'Muito Bom':{color:'#2c261b',bg:'#f8f3e8',border:'#e3d8bb',desc:'Conservação elevada'},
  Bom:{color:'#333',bg:'#f2ede7',border:'#ddd1c0',desc:'Marcas leves de uso'},
  Outlet:{color:'#6a3a16',bg:'#fbf1e5',border:'#efcba6',desc:'Preço especial'},
  Consignado:{color:'#3b2d5b',bg:'#f2eefd',border:'#d5caff',desc:'Venda consignada'}
}

function StoreHeader({onCart, cartCount, onTogglePanel, onSearch}:{onCart:()=>void;cartCount:number;onTogglePanel:()=>void; onSearch:(s:string)=>void}) {
  const [open,setOpen]=useState(false)
  const [q,setQ]=useState('')
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-[#fcfbf8]/92 border-b border-[#e7e1d7]">
      <div className="w-full bg-[#161815] text-[#ebe5d6] text-[11.5px] tracking-wide text-center py-2 font-[Instrument_Sans]">FRETE GRÁTIS · Sul/Sudeste a partir de R$ 299 — Higienização e revisão inclusas em todas as peças</div>
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="flex items-center justify-between h-[72px] sm:h-[86px]">
          <button className="lg:hidden mr-2" onClick={()=>setOpen(!open)}>{open?<X size={22}/>:<Menu size={22}/>}</button>
          <div className="flex items-center gap-8">
            <div className="text-[28px] sm:text-[34px] tracking-[.17em]" style={{fontFamily:'"Fraunces",serif', fontWeight:470}}>
              CURA<span className="text-[11px] tracking-[.32em] ml-2 align-super font-[Instrument_Sans] text-zinc-600">BR</span>
            </div>
            <nav className="hidden lg:flex items-center gap-[26px] text-[13px] tracking-[.045em] text-[#2c2a29] font-[Instrument_Sans]">
              {storeNav.slice(0,5).map(n=>(
                <a key={n.label} className="hover:opacity-70 cursor-pointer">{n.label}</a>
              ))}
              <a className="text-[#8c6947]">Coleções</a>
              <a className="text-[#8c6947]">Consignados</a>
            </nav>
          </div>
          <div className="flex items-center gap-4 sm:gap-5 text-[#222]">
            <div className="hidden sm:flex items-center border border-[#ddd5c7] bg-white rounded-full px-3 h-11 w-[236px]">
              <Search size={16} className="text-zinc-500 mr-2"/>
              <input value={q} onChange={e=>{setQ(e.target.value); onSearch(e.target.value)}} placeholder="Buscar • marca, peça, tamanho" className="text-[13px] bg-transparent outline-none w-full placeholder:text-zinc-500 font-[Instrument_Sans]"/>
            </div>
            <button className="hidden sm:block hover:opacity-70" aria-label="conta"><User2 size={18}/></button>
            <button className="hidden sm:block hover:opacity-70" aria-label="favoritos"><Heart size={18} /></button>
            <button onClick={onCart} className="relative hover:opacity-80" aria-label="sacola">
              <ShoppingBag size={19}/>
              {cartCount>0 && <span className="absolute -top-2 -right-2 text-[10px] bg-[#131313] text-white rounded-full w-5 h-5 flex items-center justify-center font-medium">{cartCount}</span>}
            </button>
            <button
              onClick={onTogglePanel}
              className="hidden md:inline-flex text-[11px] tracking-wider px-4 py-2 border border-[#beb49d] rounded-full font-[Instrument_Sans] hover:bg-[#181a18] hover:text-[#f3eee3] transition-colors"
            >PAINEL 360°</button>
          </div>
        </div>
      </div>
      {open && (
        <div className="lg:hidden px-5 pb-6 border-t border-[#ece6dc] bg-[#fcfbf8]">
          <div className="flex items-center border border-[#ddd5c7] bg-white rounded-full px-3 h-11 mt-4">
            <Search size={16} className="text-zinc-500 mr-2"/>
            <input value={q} onChange={e=>{setQ(e.target.value); onSearch(e.target.value)}} placeholder="Buscar peça..." className="text-[13px] bg-transparent outline-none w-full placeholder:text-zinc-500 font-[Instrument_Sans]"/>
          </div>
          <div className="mt-4 grid grid-cols-2 text-[13px] gap-3 font-[Instrument_Sans] text-[#35332f]">
            {storeNav.map(n=>
              <div key={n.label}>
                <div className="font-[500]">{n.label}</div>
                <div className="text-zinc-500 text-[12px] mt-1 space-y-0.5">
                  {n.subs.slice(0,4).map(s=><div key={s}>{s}</div>)}
                </div>
              </div>
            )}
          </div>
          <button onClick={onTogglePanel} className="mt-4 w-full text-[12px] rounded-full bg-[#161815] text-[#efe8d8] py-3 font-[Instrument_Sans]">Abrir Painel 360° · ERP</button>
        </div>
      )}
    </header>
  )
}

function CuradoriaStrip(){
  const items = [
    {icon:<ShieldCheck size={17}/>, t:'Higienização', s:'Lavagem profissional certificada'},
    {icon:<BadgeCheck size={17}/>, t:'Revisão', s:'Botões, zíperes e costuras'},
    {icon:<Sparkles size={17}/>, t:'Seleção', s:'Somente peças curadas'},
    {icon:<FileText size={16}/>, t:'Catalogação', s:'Fotos reais 360° + ficha técnica'},
    {icon:<QrCode size={17}/>, t:'Rastreabilidade', s:'QR Code de origem e processo'},
  ]
  return (
    <section className="border-b border-[#e6ddd0] bg-[#f7f3ea]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 py-7 sm:py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-[11px] tracking-[.19em] text-[#8b6b3a] font-[Instrument_Sans]">PROCESSO CURA 5 ETAPAS</div>
            <div className="text-[22px] sm:text-[28px] leading-tight mt-1" style={{fontFamily:'"Fraunces",serif', fontWeight:420}}>
              Cada peça passa por um rigoroso processo<br className="hidden sm:block"/> de higienização, revisão e seleção.
            </div>
          </div>
          <div className="text-[13.5px] text-[#51493b] max-w-[430px] font-[Instrument_Sans]">
            Garantimos qualidade, segurança e economia para nossos clientes, com peças únicas prontas para uso imediato.
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mt-6">
          {items.map(it=>(
            <div key={it.t} className="border border-[#e2d6c1] rounded-[18px] bg-white px-3.5 py-3.5">
              <div className="text-[#7b5a27]">{it.icon}</div>
              <div className="text-[14.5px] font-[500] mt-2" style={{fontFamily:'"Instrument Sans",sans-serif'}}>{it.t}</div>
              <div className="text-[11.5px] text-zinc-600 mt-0.5 leading-snug">{it.s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HeroCarousel(){
  const slides = [
    {
      eyebrow:'EDITORIAL CURA · INVERNO 26',
      title:'Moda circular\npremium',
      body:'Peças selecionadas de grifes internacionais com até 77% off. Higienizadas, revisadas e certificadas.',
      img:'https://images.pexels.com/photos/32314536/pexels-photo-32314536.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=1450',
      alt:'editorial'
    },
    {
      eyebrow:'CONSIGNADO INTELIGENTE',
      title:'Transforme \nseu guarda-roupa',
      body:'Vendemos para você. Contrato digital, comissão transparente, pagamento em 48h após a venda.',
      img:'https://images.pexels.com/photos/19938757/pexels-photo-19938757.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=1450',
      alt:'consignado'
    },
    {
      eyebrow:'NOVIDADES SEMANAIS',
      title:'Chegaram\n+128 peças',
      body:'Curadoria The Row, Totême, Zimmermann e mais. Tamanhos 36 a 46.',
      img:'https://images.pexels.com/photos/8387835/pexels-photo-8387835.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=1450',
      alt:'novidades'
    }
  ]
  const [idx,setIdx]=useState(0)
  useEffect(()=>{ const t=setInterval(()=>setIdx(i=>(i+1)%slides.length),5600); return ()=> clearInterval(t)},[])
  const s = slides[idx]
  return (
    <section className="max-w-[1280px] mx-auto px-5 sm:px-10 mt-7 sm:mt-10">
      <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-6 items-stretch">
        <div className="relative rounded-[30px] overflow-hidden bg-[#181818] text-[#f3eee4] min-h-[460px] sm:min-h-[550px]">
          <img src={s.img} alt={s.alt} className="absolute inset-0 w-full h-full object-cover opacity-[.72]" />
          <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_30%_30%,rgba(20,18,15,.06),rgba(9,9,9,.6)_65%)]" />
          <div className="relative z-10 p-8 sm:p-14 h-full flex flex-col justify-end">
            <div className="text-[10.5px] tracking-[.19em] text-[#ead7b1] font-[Instrument_Sans]">{s.eyebrow}</div>
            <h1 className="text-[44px] sm:text-[68px] leading-[0.95] mt-4 whitespace-pre-line" style={{fontFamily:'"Fraunces",serif', fontWeight:430}}>
              {s.title}
            </h1>
            <p className="max-w-[470px] text-[15.5px] leading-relaxed mt-5 text-[#e9e0d0] font-[Instrument_Sans]">{s.body}</p>
            <div className="flex gap-3 mt-7">
              <button className="px-6 py-[14px] bg-[#f2eee4] text-[#171717] rounded-full text-[13.5px] font-[500] tracking-[.02em]">Comprar coleção</button>
              <button className="px-6 py-[14px] border border-[#cabb9a]/70 text-[#f0e6d1] rounded-full text-[13.5px]">Ver novidades</button>
            </div>
            <div className="flex items-center gap-2 mt-8">
              {slides.map((_,i)=>(
                <button key={i} onClick={()=>setIdx(i)} className={`h-[3px] transition-all rounded-full ${i===idx? 'bg-[#efdbb3] w-11':'bg-white/35 w-7'}`}/>
              ))}
            </div>
          </div>
          <button onClick={()=>setIdx((idx-1+slides.length)%slides.length)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/22 text-white/90 rounded-full w-10 h-10 flex items-center justify-center backdrop-blur"><ChevronLeft size={19}/></button>
          <button onClick={()=>setIdx((idx+1)%slides.length)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/22 text-white/90 rounded-full w-10 h-10 flex items-center justify-center backdrop-blur"><ChevronRight size={19}/></button>
        </div>

        <div className="grid grid-rows-2 gap-6">
          <div className="rounded-[30px] border border-[#e4d8c5] bg-[#fcf9f3] p-7 sm:p-9 flex flex-col justify-between">
            <div>
              <div className="text-[11px] tracking-[.17em] text-[#9a7335] font-[Instrument_Sans]">CERTIFICAÇÃO CURA</div>
              <div className="text-[26px] sm:text-[31px] leading-tight mt-3" style={{fontFamily:'"Fraunces",serif'}}>Peças prontas<br/>para usar</div>
              <p className="text-[13.5px] text-[#514837] mt-3 leading-relaxed font-[Instrument_Sans]">✔ Higienização • ✔ Revisão • ✔ Conferência • ✔ Organização • ✔ Catalogação</p>
            </div>
            <div className="flex items-center gap-4 text-[12px] text-[#3e3526] font-[Instrument_Sans] mt-4">
              <span className="flex items-center gap-1.5"><BadgeCheck size={15} className="text-[#845f1f]"/>LGPD Ready</span>
              <span className="flex items-center gap-1.5"><Shield size={15} className="text-[#845f1f]"/>Nota Fiscal</span>
            </div>
          </div>
          <div className="rounded-[30px] overflow-hidden relative min-h-[210px] bg-[#26221c]">
            <img src="https://images.pexels.com/photos/6069079/pexels-photo-6069079.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=560" className="absolute inset-0 w-full h-full object-cover opacity-80" alt="boutique"/>
            <div className="absolute inset-0" style={{background:'linear-gradient(110deg, rgba(22,17,12,.64), rgba(15,15,15,.22) 55%)'}}/>
            <div className="relative p-7 sm:p-8 text-[#f2e8d3] h-full flex flex-col justify-end">
              <div className="text-[10.5px] tracking-[.17em]">SHOWROOM · SP · PINHEIROS</div>
              <div className="text-[24px] mt-2" style={{fontFamily:'"Fraunces",serif'}}>Visite ateliê com agendamento</div>
              <div className="text-[13px] mt-2 opacity-90 font-[Instrument_Sans]">Ter–Sáb • 10h às 19h • Rua Fradique Coutinho, 914</div>
              <button className="mt-4 text-[13px] underline underline-offset-4">Ver mapa</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ConditionPill({c}:{c:Condition}){
  const m = conditionMeta[c]
  return <span className="text-[10.5px] tracking-[.11em] px-2.5 py-1 rounded-full border" style={{ background:m.bg, color:m.color, borderColor:m.border}}>{c.toUpperCase()}</span>
}

function ProductCard({p, onOpen, onAdd}:{p:Product; onOpen:(p:Product)=>void; onAdd:(p:Product)=>void;}){
  return (
    <div className="group">
      <div className="relative rounded-[22px] overflow-hidden bg-[#f5f1ea] aspect-[3/4]">
        <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-[650ms] group-hover:scale-[1.032]"/>
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {p.new && <div className="text-[10px] tracking-widest bg-white/95 px-2.5 py-1 rounded-full font-[600]">NOVO</div>}
          <ConditionPill c={p.condition}/>
          {p.consignado && <div className="text-[10px] tracking-widest bg-[#23143a] text-[#efe8ff] px-2.5 py-1 rounded-full">CONSIG.</div>}
        </div>
        <button className="absolute top-3 right-3 bg-white/93 rounded-full w-9 h-9 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition">
          <Heart size={16}/>
        </button>
        <button
          onClick={()=>onAdd(p)}
          className="absolute left-3 right-3 bottom-3 bg-[#111411] text-[#efe9d9] text-[12.5px] tracking-[.04em] py-3 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all font-[Instrument_Sans]"
        >Adicionar • {brl(p.price)}</button>
      </div>
      <button onClick={()=>onOpen(p)} className="text-left w-full mt-3">
        <div className="text-[11px] text-zinc-500 font-[Fragment_Mono]">{p.id} · {p.brand}</div>
        <div className="text-[15.5px] mt-1 leading-snug text-[#1b1b1b]" style={{fontFamily:'"Fraunces",serif'}}>{p.name}</div>
        <div className="flex items-center justify-between mt-1.5 font-[Instrument_Sans]">
          <div className="text-[12px] text-zinc-600">{p.color} · {p.size}</div>
          <div className="flex items-baseline gap-2">
            <span className="font-[600] text-[16px]">{brl(p.price)}</span>
            {p.compareAt && <span className="text-[12px] text-zinc-400 line-through">{brl(p.compareAt)}</span>}
          </div>
        </div>
      </button>
    </div>
  )
}

function CollectionRail(){
  const cats = [
    {name:'Vestidos', ct:'142 peças', img:'https://images.pexels.com/photos/33669432/pexels-photo-33669432.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=660&h=520'},
    {name:'Blazers & Jaquetas', ct:'88 peças', img:'https://images.pexels.com/photos/20235969/pexels-photo-20235969.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=660&h=520'},
    {name:'Moda Festa', ct:'56 peças', img:'https://images.pexels.com/photos/34922839/pexels-photo-34922839.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=660&h=520'},
    {name:'Acessórios', ct:'214 peças', img:'https://images.pexels.com/photos/20251644/pexels-photo-20251644.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=660&h=520'}
  ]
  return (
    <div className="max-w-[1280px] mx-auto px-5 sm:px-10 mt-14">
      <div className="flex items-end justify-between mb-5">
        <h2 className="text-[28px] sm:text-[36px]" style={{fontFamily:'"Fraunces",serif'}}>Coleções em curadoria</h2>
        <a className="text-[13px] underline underline-offset-4">Ver todas as categorias</a>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cats.map(c=>(
          <div key={c.name} className="group relative rounded-[24px] overflow-hidden h-[258px] bg-zinc-800">
            <img src={c.img} className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-[1.04]" alt={c.name}/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/18 to-transparent"/>
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <div className="text-[22px]" style={{fontFamily:'"Fraunces",serif'}}>{c.name}</div>
              <div className="text-[12px] opacity-90 font-[Instrument_Sans]">{c.ct}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StoreFront({onOpenPanel}:{onOpenPanel:()=>void}) {
  const [search,setSearch]=useState('')
  const [selected,setSelected]=useState<Product|null>(null)
  const [cart,setCart]=useState<Product[]>([])
  const [cartOpen,setCartOpen]=useState(false)

  const filtered = useMemo(()=>{
    if(!search) return PRODUCTS
    const s = search.toLowerCase()
    return PRODUCTS.filter(p=>
      p.name.toLowerCase().includes(s) ||
      p.brand.toLowerCase().includes(s) ||
      p.category.toLowerCase().includes(s) ||
      p.sub.toLowerCase().includes(s)
    )
  },[search])

  const addToCart = (p:Product)=> { setCart(c=>[...c,p]); setCartOpen(true) }

  return (
    <div className="min-h-screen bg-[#fbf9f5] text-[#1c1c1a]" style={{fontFamily:'"Instrument Sans",system-ui,sans-serif'}}>
      <StoreHeader onCart={()=>setCartOpen(true)} cartCount={cart.length} onTogglePanel={onOpenPanel} onSearch={setSearch}/>
      <HeroCarousel/>
      <CuradoriaStrip/>
      <CollectionRail/>

      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 mt-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-[11px] tracking-[.18em] text-[#9b7040] font-[Instrument_Sans]">LANÇAMENTOS · INVERNO CURADO</div>
            <h2 className="text-[30px] sm:text-[39px] mt-1" style={{fontFamily:'"Fraunces",serif'}}>Peças em destaque</h2>
          </div>
          <div className="hidden sm:flex gap-2 text-[12px]">
            {['Todas','Premium','Excelente','Consignado','Outlet'].map(f=>(
              <button key={f} className={`px-4 py-2 rounded-full border ${f==='Todas'?'bg-[#181a18] text-[#f2e9d8] border-[#181a18]':'border-[#d8ccb6] text-[#403a32]'}`}>{f}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {filtered.map(p=> <ProductCard key={p.id} p={p} onOpen={setSelected} onAdd={addToCart}/>)}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 rounded-full border border-[#c8b998] text-[13px] tracking-[.04em]">VER CATÁLOGO COMPLETO · 1.284 peças</button>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 mt-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center bg-[#efe8d9] rounded-[30px] p-7 sm:p-12">
          <div>
            <div className="text-[11px] tracking-[.16em] text-[#8a6737]">CONSIGNADO CURA</div>
            <div className="text-[36px] sm:text-[44px] leading-[1.04] mt-3" style={{fontFamily:'"Fraunces",serif'}}>Monetize seu<br/>guarda-roupa premium</div>
            <p className="text-[15px] text-[#3f3527] mt-4 max-w-[480px] leading-relaxed font-[Instrument_Sans]">
              Avaliamos, fotografamos, higienizamos e vendemos para você. Contrato digital assinado, controle 24/7 no app, pagamento em 48h.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-7 text-[13px]">
              {[
                {l:'Comissão loja',v:'35%'},
                {l:'Prazo médio',v:'23 dias'},
                {l:'Payout',v:'PIX 48h'}
              ].map(x=>(
                <div key={x.l} className="bg-white/65 rounded-[16px] border border-white/80 px-4 py-3">
                  <div className="text-[11px] text-zinc-600">{x.l}</div>
                  <div className="text-[21px] mt-1" style={{fontFamily:'"Fraunces",serif'}}>{x.v}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button className="px-5 py-[12px] rounded-full bg-[#161815] text-[#f3ebdc] text-[13px]">Agendar avaliação</button>
              <button className="px-5 py-[12px] rounded-full border border-[#bfa77a] text-[13px]">Simular comissão</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {['https://images.pexels.com/photos/27230001/pexels-photo-27230001.png?auto=compress&cs=tinysrgb&fit=crop&w=620&h=740',
              'https://images.pexels.com/photos/14693665/pexels-photo-14693665.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=620&h=740',
              'https://images.pexels.com/photos/17040846/pexels-photo-17040846.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=620&h=740',
              'https://images.pexels.com/photos/6982609/pexels-photo-6982609.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=620&h=740'
            ].map((src,i)=>(
              <img key={i} src={src} className="rounded-[20px] object-cover h-[200px] sm:h-[238px] w-full" alt="editorial"/>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 mt-20">
        <div className="flex items-end justify-between mb-6">
          <h3 className="text-[30px] sm:text-[35px]" style={{fontFamily:'"Fraunces",serif'}}>Clientes Cura</h3>
          <div className="text-[12px] text-zinc-600 flex items-center gap-1"><Star size={14} className="text-amber-500 fill-amber-400"/> 4,9/5 • 842 avaliações</div>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {n:'Marina S.', c:'São Paulo', t:'Qualidade de boutique nova. Meu vestido Céline chegou cheirando, com nota de revisão e QR Code. Surreal!'},
            {n:'Isabela F.', c:'Consignante', t:'Vendi 14 peças em 32 dias. O painel mostra tudo, comissão justa, pagamento no PIX rapidinho.'},
            {n:'Carolina P.', c:'Rio de Janeiro', t:'Curadoria impecável. Já é meu primeiro lugar para achar peças únicas de verdade.'},
          ].map(d=>(
            <div key={d.n} className="bg-white rounded-[22px] border border-[#e7dbca] p-6">
              <div className="flex gap-1 text-amber-500">{Array.from({length:5}).map((_,i)=><Star size={14} key={i} fill="currentColor"/>)}</div>
              <p className="mt-3 text-[14.5px] text-[#2d2b28] leading-relaxed font-[Instrument_Sans]">“{d.t}”</p>
              <div className="text-[12.5px] mt-3 text-zinc-600">{d.n} · {d.c}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 mt-20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <CameraIcon size={20} />
            <div>
              <div className="text-[13px] text-zinc-500">@cura.brecho360</div>
              <div className="text-[20px]" style={{fontFamily:'"Fraunces",serif'}}>No Instagram todo dia tem drop</div>
            </div>
          </div>
          <button className="text-[13px] underline underline-offset-4">Seguir</button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {[
            'https://images.pexels.com/photos/20310517/pexels-photo-20310517.jpeg?auto=compress&cs=tinysrgb&w=420&h=420&fit=crop',
            'https://images.pexels.com/photos/4355793/pexels-photo-4355793.jpeg?auto=compress&cs=tinysrgb&w=420&h=420&fit=crop',
            'https://images.pexels.com/photos/32314538/pexels-photo-32314538.jpeg?auto=compress&cs=tinysrgb&w=420&h=420&fit=crop',
            'https://images.pexels.com/photos/26292716/pexels-photo-26292716.jpeg?auto=compress&cs=tinysrgb&w=420&h=420&fit=crop',
            'https://images.pexels.com/photos/3999866/pexels-photo-3999866.jpeg?auto=compress&cs=tinysrgb&w=420&h=420&fit=crop',
            'https://images.pexels.com/photos/15063333/pexels-photo-15063333.jpeg?auto=compress&cs=tinysrgb&w=420&h=420&fit=crop',
          ].map((u,i)=>(
            <img key={i} src={u} className="rounded-[18px] object-cover aspect-square" alt="insta"/>
          ))}
        </div>
      </section>

      <footer className="mt-20 border-t border-[#e3d7c4] bg-[#f6f1e7]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 py-14 grid md:grid-cols-5 gap-10 text-[13.5px] text-[#3a3429] font-[Instrument_Sans]">
          <div className="md:col-span-2">
            <div className="text-[30px] tracking-[.17em]" style={{fontFamily:'"Fraunces",serif'}}>CURA</div>
            <p className="mt-3 max-w-[360px] leading-relaxed">Brechó Inteligente 360° • Moda circular premium. CNPJ 42.118.922/0001-70 • LGPD Ready • Nota Fiscal em todas as vendas.</p>
            <div className="mt-4 text-[12.5px]">Rua Fradique Coutinho, 914 · Pinheiros · São Paulo/SP<br/>Ter–Sáb 10h–19h • contato@cura360.com.br</div>
            <div className="flex gap-3 mt-4 text-[12px]">
              <span className="px-3 py-1.5 rounded-full border border-[#d4c5ab] bg-white">PIX</span>
              <span className="px-3 py-1.5 rounded-full border border-[#d4c5ab] bg-white">Cartão</span>
              <span className="px-3 py-1.5 rounded-full border border-[#d4c5ab] bg-white">Boleto</span>
              <span className="px-3 py-1.5 rounded-full border border-[#d4c5ab] bg-white">Crediário</span>
            </div>
          </div>
          {[
            {t:'Loja',l:['Feminino','Masculino','Infantil','Calçados','Acessórios','Consignados']},
            {t:'Sistema',l:['Painel 360°','Estoque Inteligente','Financeiro BI','CRM & Marketing','Consignado','Formação de Preço']},
            {t:'Empresa',l:['Curadoria 5 etapas','Consignar peças','Fornecedores','LGPD','Contato','Suporte']}
          ].map(col=>(
            <div key={col.t}>
              <div className="text-[11px] tracking-[.15em] text-[#8c7050] mb-3">{col.t.toUpperCase()}</div>
              <ul className="space-y-2">
                {col.l.map(i=> <li key={i} className="hover:underline cursor-pointer">{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-[#e2d4be] text-[11.8px] px-5 sm:px-10 py-5 flex flex-wrap items-center justify-between gap-3 text-zinc-600">
          <div>© 2026 CURA Brechó Inteligente 360° · Todos os direitos reservados · SaaS v3.8.1 PWA</div>
          <div className="flex items-center gap-4">
            <span>Hospedado Vercel · Supabase PostgreSQL</span>
            <span className="flex items-center gap-1"><ShieldCheck size={14}/> LGPD</span>
            <span className="flex items-center gap-1"><DatabaseZap size={14}/> Backup automático</span>
          </div>
        </div>
      </footer>

      <a href="https://wa.me/5511999999999" className="fixed bottom-5 right-5 z-50 bg-[#1a8f4c] text-white rounded-full px-4 py-3 shadow-xl text-[13px] font-[500] flex items-center gap-2 hover:scale-[1.03] transition-transform">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse"/>
        WhatsApp Cura
      </a>

      {selected && (
        <div className="fixed inset-0 z-[60] bg-black/55 backdrop-blur-[2px] flex items-center justify-center p-4" onClick={()=>setSelected(null)}>
          <div className="bg-[#fdfcf9] rounded-[28px] max-w-[1060px] w-full overflow-hidden grid md:grid-cols-[1.05fr_.95fr]" onClick={e=>e.stopPropagation()}>
            <div className="relative bg-[#f4efe5]">
              <img src={selected.image} className="w-full h-full object-cover max-h-[720px]" alt={selected.name}/>
              <div className="absolute top-4 left-4 flex gap-2">
                <ConditionPill c={selected.condition}/>
              </div>
              <div className="absolute bottom-4 left-4 text-[11px] bg-white/92 px-3 py-1.5 rounded-full">ID {selected.id} · QR rastreamento</div>
            </div>
            <div className="p-7 sm:p-9 flex flex-col">
              <button onClick={()=>setSelected(null)} className="self-end text-zinc-500 hover:text-black"><X size={20}/></button>
              <div className="text-[11px] tracking-[.13em] text-zinc-500">{selected.brand.toUpperCase()}</div>
              <div className="text-[30px] mt-1" style={{fontFamily:'"Fraunces",serif'}}>{selected.name}</div>
              <div className="text-[13px] text-zinc-600 mt-1">{selected.color} · {selected.size} · {selected.sub}</div>
              <div className="flex items-baseline gap-3 mt-4">
                <div className="text-[27px] font-[600]">{brl(selected.price)}</div>
                {selected.compareAt && <div className="text-[14px] line-through text-zinc-400">{brl(selected.compareAt)}</div>}
                {selected.compareAt && <div className="text-[11px] bg-emerald-100 text-emerald-900 px-2 py-1 rounded-full">- {Math.round(100-(selected.price/selected.compareAt*100))}%</div>}
              </div>
              <div className="mt-5 border border-[#e6d9c5] rounded-[16px] p-4 bg-[#fcf9f3] text-[12.5px] leading-relaxed text-[#423b2c]">
                <div className="font-[600] mb-1">Peça curada · ficha técnica</div>
                ✔ Higienização profissional • ✔ Revisão de aviamentos • ✔ Conferência de qualidade • ✔ Catalogação com fotos reais<br/>
                <div className="mt-2 text-zinc-600">Condição: <b>{selected.condition}</b> · {conditionMeta[selected.condition].desc}</div>
                <div className="mt-2 flex gap-3">
                  <span className="flex items-center gap-1"><QrCode size={14}/> Rastreabilidade</span>
                  <span className="flex items-center gap-1"><Barcode size={14}/> {selected.id}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4 text-[12px]">
                <div className="border border-[#e4d4bb] rounded-[12px] px-3 py-3">Tamanho<br/><b>{selected.size}</b></div>
                <div className="border border-[#e4d4bb] rounded-[12px] px-3 py-3">Estoque<br/><b>{selected.stock} unid.</b></div>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={()=>{addToCart(selected); setSelected(null)}} className="flex-1 bg-[#161815] text-[#f2e9d8] rounded-full py-[14px] text-[13.5px]">Adicionar à sacola</button>
                <button className="px-4 rounded-full border border-[#d4c7ad]"><Heart size={18}/></button>
              </div>
              <div className="text-[12px] text-zinc-600 mt-4 space-y-1">
                <div>✔ Frete grátis Sul/Sudeste acima R$ 299</div>
                <div>✔ Troca em 7 dias · higienização inclusa</div>
                <div>✔ PIX, Cartão até 6x, Boleto, Crediário</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {cartOpen && (
        <div className="fixed inset-0 z-[70]">
          <div className="absolute inset-0 bg-black/45" onClick={()=>setCartOpen(false)}/>
          <div className="absolute right-0 top-0 h-full w-[420px] max-w-[94vw] bg-[#fbf9f5] shadow-2xl flex flex-col">
            <div className="px-6 py-5 border-b border-[#e6d9c4] flex items-center justify-between">
              <div className="text-[20px]" style={{fontFamily:'"Fraunces",serif'}}>Sacola</div>
              <button onClick={()=>setCartOpen(false)}><X size={20}/></button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {cart.length===0 && <div className="text-zinc-500 text-[14px]">Sua sacola está vazia.</div>}
              {cart.map((p,i)=>(
                <div key={i} className="flex gap-3 border-b border-[#eee4d3] pb-3">
                  <img src={p.image} className="w-[74px] h-[92px] object-cover rounded-xl" alt={p.name}/>
                  <div className="flex-1 text-[13px]">
                    <div className="font-[500]">{p.name}</div>
                    <div className="text-zinc-600">{p.size} · {p.color}</div>
                    <div className="mt-1 font-[600]">{brl(p.price)}</div>
                  </div>
                  <button onClick={()=>setCart(cart.filter((_,idx)=>idx!==i))} className="text-zinc-500"><Trash2 size={16}/></button>
                </div>
              ))}
            </div>
            <div className="px-5 py-5 border-t border-[#e6d9c4] bg-[#f7f1e2]">
              <div className="flex justify-between text-[14px]"><span>Subtotal</span><span className="font-[600]">{brl(cart.reduce((a,b)=>a+b.price,0))}</span></div>
              <div className="text-[11.5px] text-zinc-600 mt-1">Frete calculado no checkout · Higienização inclusa</div>
              <button className="w-full mt-4 bg-[#161815] text-[#f3e9d6] py-3 rounded-full text-[13.5px]">Finalizar · checkout seguro</button>
              <div className="text-[11px] text-center mt-3 text-zinc-600">PIX • Cartão • Boleto • Crediário</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const dashSales = [
  {d:'SEG', v:4300},{d:'TER', v:6100},{d:'QUA', v:5400},{d:'QUI', v:7200},{d:'SEX', v:9800},{d:'SÁB', v:12700},{d:'DOM', v:5400}
]
const dashCat = [
  {name:'Feminino', value:62},{name:'Acessórios', value:18},{name:'Masculino', value:12},{name:'Infantil', value:8}
]
const finCash = [
  {m:'Jan', rec:48000, desp:32000}, {m:'Fev', rec:52000, desp:31000}, {m:'Mar', rec:61000, desp:34000},
  {m:'Abr', rec:57200, desp:36200}, {m:'Mai', rec:70500, desp:38800}, {m:'Jun', rec:78400, desp:41500},
]

const COLORS = ['#1c2b1f','#c79a4a','#8d6d44','#b8aa92']

function Kpi({label,value,delta,up,icon}:{label:string;value:string;delta?:string;up?:boolean;icon?:React.ReactNode}){
  return (
    <div className="rounded-[22px] bg-white border border-[#e7decc] px-5 py-5">
      <div className="flex items-center justify-between text-[11px] text-zinc-500 tracking-[.09em]">
        <span>{label}</span>
        <span className="text-zinc-400">{icon}</span>
      </div>
      <div className="text-[28px] mt-2" style={{fontFamily:'"Fraunces",serif'}}>{value}</div>
      {delta && <div className={`text-[12px] mt-1 flex items-center gap-1 ${up?'text-emerald-700':'text-rose-700'}`}>{up? <ArrowUpRight size={14}/>:<ArrowDownRight size={14}/>}{delta}</div>}
    </div>
  )
}

function AdminShell({onCloseStore}:{onCloseStore:()=>void}){
  const [module,setModule]=useState('Dashboard Executivo')
  const modules = [
    {name:'Dashboard Executivo', icon:<LayoutDashboard size={16}/>},
    {name:'PDV / Vendas', icon:<CreditCard size={16}/>},
    {name:'Estoque Inteligente', icon:<Archive size={16}/>},
    {name:'Produtos & Catálogo', icon:<Package size={16}/>},
    {name:'Consignado', icon:<HandCoins size={16}/>},
    {name:'Fornecedores', icon:<Users size={16}/>},
    {name:'Clientes · CRM', icon:<User2 size={16}/>},
    {name:'Financeiro BI', icon:<CircleDollarSign size={16}/>},
    {name:'Formação de Preço', icon:<Tags size={16}/>},
    {name:'Marketing', icon:<Megaphone size={16}/>},
    {name:'BI Corporativo', icon:<BarChart3 size={16}/>},
    {name:'Impressão', icon:<Printer size={16}/>},
    {name:'Backup & LGPD', icon:<DatabaseZap size={16}/>},
  ]

  return (
    <div className="min-h-screen bg-[#f3f1eb] text-[#1f1e1b]" style={{fontFamily:'"Instrument Sans",system-ui,sans-serif'}}>
      <div className="flex">
        <aside className="w-[272px] bg-[#141615] text-[#e7ddd0] min-h-screen hidden lg:block sticky top-0">
          <div className="px-6 py-6 border-b border-white/10">
            <div className="text-[26px] tracking-[.16em]" style={{fontFamily:'"Fraunces",serif'}}>CURA</div>
            <div className="text-[10.5px] tracking-[.22em] text-[#c7b896] mt-1">BRECHÓ INTELIGENTE 360°</div>
            <div className="mt-3 text-[11px] bg-[#232622] border border-white/10 rounded-full px-3 py-1 inline-flex">SaaS v3.8.1 · PWA ativo</div>
          </div>
          <div className="px-3 py-4 space-y-1">
            {modules.map(m=>(
              <button key={m.name} onClick={()=>setModule(m.name)}
                className={`w-full text-left flex items-center gap-3 px-3 py-[11px] rounded-[12px] text-[13.5px] ${module===m.name? 'bg-[#f4f0e5] text-[#171615]' : 'hover:bg-white/7 text-[#e4dac9]'}`}>
                <span className="opacity-85">{m.icon}</span>
                <span>{m.name}</span>
              </button>
            ))}
          </div>
          <div className="px-5 mt-3 text-[11.5px] text-[#b9ac95] space-y-3">
            <div className="bg-[#1c1f1c] border border-white/10 rounded-[14px] px-3 py-3">
              <div className="text-[10px] tracking-widest text-[#d8bf86]">BACKUP INTELIGENTE</div>
              <div className="mt-1 text-[#ece2cf]">Último: hoje 04:12 · OK</div>
              <div className="text-[11px] mt-1 text-[#bdaa87]">“Seus dados são o patrimônio digital da empresa.”</div>
            </div>
            <div>Admin: luciana@cura360<br/><span className="text-zinc-400">Administrador Geral</span></div>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="h-[66px] bg-white/95 border-b border-[#e6ddd0] flex items-center justify-between px-5 sm:px-8 backdrop-blur">
            <div className="flex items-center gap-3">
              <button className="lg:hidden" onClick={onCloseStore}><Menu size={20}/></button>
              <div>
                <div className="text-[11px] text-zinc-500 tracking-[.12em]">PAINEL 360°</div>
                <div className="text-[17px] sm:text-[19px] font-[600]">{module}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-[12px] bg-[#f6f0e0] border border-[#e4d7be] px-3 py-1.5 rounded-full text-[#705a2d]">
                <ShieldCheck size={14}/> LGPD ativo
              </div>
              <button className="relative"><Bell size={19}/><span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full"/></button>
              <div className="w-9 h-9 rounded-full bg-[#232220] text-[#f3e9d4] flex items-center justify-center text-[12px]">LC</div>
              <button onClick={onCloseStore} className="text-[12px] border px-3 py-1.5 rounded-full hidden sm:block">Voltar à loja</button>
            </div>
          </div>

          <div className="p-5 sm:p-8">
            {module==='Dashboard Executivo' && <ModuleDashboard/>}
            {module==='PDV / Vendas' && <ModulePDV/>}
            {module==='Estoque Inteligente' && <ModuleStock/>}
            {module==='Produtos & Catálogo' && <ModuleProducts/>}
            {module==='Consignado' && <ModuleConsignado/>}
            {module==='Fornecedores' && <ModuleVendors/>}
            {module==='Clientes · CRM' && <ModuleCRM/>}
            {module==='Financeiro BI' && <ModuleFinanceiro/>}
            {module==='Formação de Preço' && <ModulePreco/>}
            {module==='Marketing' && <ModuleMarketing/>}
            {module==='BI Corporativo' && <ModuleBI/>}
            {module==='Impressão' && <ModulePrint/>}
            {module==='Backup & LGPD' && <ModuleBackup/>}
          </div>
        </div>
      </div>
    </div>
  )
}

function ModuleDashboard(){
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Kpi label="VENDAS HOJE" value="R$ 8.420" delta="+18,4% vs ontem" up icon={<Zap size={14}/>}/>
        <Kpi label="VENDAS MÊS" value="R$ 214,7k" delta="+12,1% M/M" up icon={<BarChart3 size={14}/>}/>
        <Kpi label="PEÇAS ESTOQUE" value="1.284" delta="41 sem foto" up={false} icon={<Archive size={14}/>}/>
        <Kpi label="TICKET MÉDIO" value="R$ 376" delta="+6,8%" up icon={<CircleDollarSign size={14}/>}/>
      </div>

      <div className="grid xl:grid-cols-[1.35fr_.65fr] gap-5">
        <div className="bg-white rounded-[22px] border border-[#e4d6bf] p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[15px] font-[600]">Vendas · últimos 7 dias</div>
            <div className="text-[11px] text-zinc-600">Atualização 14:22</div>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dashSales}>
                <defs>
                  <linearGradient id="gc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#b7893d" stopOpacity={0.33}/>
                    <stop offset="95%" stopColor="#b7893d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#eee"/>
                <XAxis dataKey="d" stroke="#888" fontSize={12}/>
                <YAxis stroke="#888" fontSize={12}/>
                <Tooltip formatter={(v:any)=>brl(v)}/>
                <Area type="monotone" dataKey="v" stroke="#9c6a20" fill="url(#gc)" strokeWidth={2}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-[22px] border border-[#e4d6bf] p-5">
          <div className="text-[15px] font-[600] mb-2">Categorias mais vendidas</div>
          <div className="h-[210px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dashCat} dataKey="value" nameKey="name" outerRadius={84} innerRadius={48} paddingAngle={3}>
                  {dashCat.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
                </Pie>
                <Tooltip/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[12.5px] mt-1">
            {dashCat.map((c,i)=><div key={c.name} className="flex items-center gap-2">
              <span className="w-[9px] h-[9px] rounded-full" style={{background:COLORS[i]}}/>
              {c.name} · {c.value}%
            </div>)}
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-3 gap-5">
        {[
          {t:'Peças Vendidas', v:'572', d:'últimos 30d'},
          {t:'Consignadas Ativas', v:'318', d:'R$ 104k potencial'},
          {t:'Clientes Ativos', v:'1.420', d:'VIP 214'},
          {t:'Inadimplentes', v:'12', d:'R$ 4.380'},
          {t:'Lucro Mês', v:'R$ 46,9k', d:'margem 31,4%'},
          {t:'Fornecedores PF', v:'86', d:'+4 este mês'},
        ].map(k=>(
          <div key={k.t} className="bg-white rounded-[20px] border border-[#e4d6bf] px-5 py-4">
            <div className="text-[12px] text-zinc-600">{k.t}</div>
            <div className="text-[26px]" style={{fontFamily:'"Fraunces",serif'}}>{k.v}</div>
            <div className="text-[11.5px] text-zinc-500">{k.d}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[22px] border border-[#e4d6bf] p-5">
        <div className="text-[15px] font-[600] mb-3">Alertas inteligentes de estoque</div>
        <div className="grid md:grid-cols-3 gap-3 text-[13px]">
          {[
            {ic:<AlertTriangle size={14} className="text-amber-600"/>, t:'Estoque baixo', d:'19 SKUs com Qtd ≤ 1'},
            {ic:<Clock3 size={14} className="text-rose-600"/>, t:'Produto parado', d:'32 peças > 60 dias'},
            {ic:<CheckCircle2 size={14} className="text-emerald-700"/>, t:'Sem foto', d:'41 peças precisam catálogo'},
          ].map(a=>(
            <div key={a.t} className="rounded-[14px] border border-[#e9dac0] bg-[#fffcf6] px-4 py-3 flex items-start gap-3">
              <div>{a.ic}</div>
              <div>
                <div className="font-[500]">{a.t}</div>
                <div className="text-zinc-600">{a.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ModulePDV(){
  const cart = PRODUCTS.slice(0,3)
  const total = cart.reduce((a,b)=>a+b.price,0)
  return (
    <div className="grid xl:grid-cols-[1.1fr_.9fr] gap-5">
      <div className="bg-white rounded-[22px] border border-[#e4d6bf] p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="text-[16px] font-[600]">PDV Rápido · Terminal 01</div>
          <div className="text-[11px] bg-[#f2efe3] border px-2 py-1 rounded-full">Venda #4189</div>
        </div>
        <div className="border rounded-[14px] px-3 py-2 flex items-center gap-2 mb-4">
          <Barcode size={16} className="text-zinc-500"/>
          <input className="flex-1 outline-none text-[14px]" placeholder="Ler código de barras / QR · CUR-xxxx"/>
          <button className="text-[12px] border px-3 py-1.5 rounded-full">Buscar</button>
        </div>
        <div className="space-y-3 max-h-[380px] overflow-auto pr-1">
          {cart.map(p=>(
            <div key={p.id} className="flex items-center justify-between border-b border-[#f0e5d2] pb-3">
              <div className="flex items-center gap-3">
                <img src={p.image} className="w-14 h-16 object-cover rounded-lg" />
                <div>
                  <div className="text-[13.5px] font-[500]">{p.name}</div>
                  <div className="text-[11.5px] text-zinc-600">{p.id} · {p.size}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button className="w-7 h-7 rounded-full border">-</button>
                  <span className="text-[13px]">1</span>
                  <button className="w-7 h-7 rounded-full border">+</button>
                </div>
                <div className="w-24 text-right font-[600]">{brl(p.price)}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-[12.5px]">
          {['PIX','Débito','Crédito','Dinheiro','Boleto','Crediário'].map(m=>(
            <button key={m} className="border rounded-[10px] py-2 hover:bg-[#f9f4e7]">{m}</button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-[22px] border border-[#e4d6bf] p-5 flex flex-col">
        <div className="text-[15px] font-[600] mb-3">Resumo da venda</div>
        <div className="space-y-2 text-[13.5px]">
          <div className="flex justify-between"><span>Subtotal</span><span>{brl(total)}</span></div>
          <div className="flex justify-between text-zinc-600"><span>Desconto</span><span>- R$ 0,00</span></div>
          <div className="flex justify-between font-[600] text-[16px] border-t pt-2 mt-2"><span>Total</span><span>{brl(total)}</span></div>
        </div>
        <div className="mt-4 text-[12px] text-zinc-600">Múltiplas formas por venda · split automático consignado</div>
        <button className="mt-auto bg-[#161815] text-[#f2e9d6] rounded-[14px] py-[14px] font-[500]">Finalizar · Imprimir cupom</button>
        <div className="text-[11px] text-center text-zinc-500 mt-3">Impressora Térmica Elgin i9 pronta · Nota NFC-e p/ integração</div>
      </div>
    </div>
  )
}

function ModuleStock(){
  const rows = PRODUCTS.slice(0,7).map((p,i)=>({
    ...p,
    entrada: ['23/05','01/06','05/06','07/06','08/06','09/06','10/06'][i],
    status: i%3===0?'Parado 47d': i%4===0?'Sem foto': 'OK'
  }))
  return (
    <div className="bg-white rounded-[22px] border border-[#e4d6bf] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="text-[16px] font-[600]">Estoque Inteligente</div>
        <div className="flex gap-2 text-[12px]">
          <button className="px-3 py-1.5 border rounded-full bg-[#fdf7ec]">Baixo estoque (19)</button>
          <button className="px-3 py-1.5 border rounded-full">Parado (32)</button>
          <button className="px-3 py-1.5 border rounded-full">Sem foto (41)</button>
        </div>
      </div>
      <div className="overflow-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-left text-zinc-500 border-b">
              {['Código','Peça','Condição','Tamanho','Estoque','Entrada','Status','QR'].map(h=><th key={h} className="py-2 pr-4">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map(r=>(
              <tr key={r.id} className="border-b border-[#f0e4d2]">
                <td className="py-3 pr-4 font-[Fragment_Mono] text-[12px]">{r.id}</td>
                <td className="py-3 pr-4">{r.name}</td>
                <td className="py-3 pr-4">{r.condition}</td>
                <td className="py-3 pr-4">{r.size}</td>
                <td className="py-3 pr-4">{r.stock}</td>
                <td className="py-3 pr-4">{r.entrada}</td>
                <td className="py-3 pr-4"><span className={`text-[11px] px-2 py-1 rounded-full border ${r.status==='OK'?'bg-emerald-50 text-emerald-800 border-emerald-200':'bg-amber-50 text-amber-800 border-amber-200'}`}>{r.status}</span></td>
                <td className="py-3 pr-4"><QrCode size={16}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-[11.5px] text-zinc-600 mt-3">Código interno automático · Código de barras · QR Code rastreável · Reservas / Trocas / Saídas</div>
    </div>
  )
}

function ModuleProducts(){
  const [cost,setCost] = useState(120)
  const [markup,setMarkup] = useState(185)
  const price = Math.round(cost * (1 + markup/100))
  return (
    <div className="grid xl:grid-cols-[1.4fr_.6fr] gap-5">
      <div className="bg-white rounded-[22px] border border-[#e4d6bf] p-5">
        <div className="text-[16px] font-[600] mb-3">Cadastro de Produto · Editor Visual (Shopify-like)</div>
        <div className="grid sm:grid-cols-2 gap-4 text-[13px]">
          {[
            ['Nome da peça','Vestido Midi Drapê Seda'],
            ['Marca','Céline Archive'],
            ['Categoria','Feminino · Vestidos'],
            ['Tamanho','M · 40'],
            ['Cor','Verde Oliva'],
          ].map(([l,v])=>(
            <label key={l} className="block">
              <div className="text-[11.5px] text-zinc-600 mb-1">{l}</div>
              <input defaultValue={v} className="w-full border border-[#dbcba7] rounded-[10px] px-3 py-[10px] bg-[#fdfbf6] outline-none"/>
            </label>
          ))}
          <label className="block sm:col-span-2">
            <div className="text-[11.5px] text-zinc-600 mb-1">Descrição editorial</div>
            <textarea className="w-full border border-[#dbcba7] rounded-[12px] px-3 py-2 h-[92px] bg-[#fdfbf6] outline-none" defaultValue="Vestido midi em seda pura. Curadoria Premium. Higienizado e revisado. Peça única."/>
          </label>
        </div>
        <div className="mt-4">
          <div className="text-[11.5px] text-zinc-600 mb-2">Fotos & Vídeos · arrastar e soltar · ImgBB integrado</div>
          <div className="grid grid-cols-5 gap-3">
            {PRODUCTS.slice(0,4).map(p=>(
              <img key={p.id} src={p.image} className="w-full h-[94px] object-cover rounded-[12px] border" alt="up"/>
            ))}
            <div className="h-[94px] border-2 border-dashed border-[#d5c39e] rounded-[12px] flex items-center justify-center text-[11px] text-zinc-500">+ Upload</div>
          </div>
        </div>
        <div className="flex gap-2 mt-4 text-[12px] flex-wrap">
          {(['Premium','Excelente','Muito Bom','Bom','Outlet','Consignado'] as Condition[]).map(c=>(
            <button key={c} className={`px-3 py-1.5 rounded-full border ${c==='Premium'?'bg-[#111a14] text-[#e8f3ec] border-[#111a14]':'border-[#d7c9aa]'}`}>{c}</button>
          ))}
        </div>
        <div className="flex gap-3 mt-5">
          <button className="bg-[#161815] text-[#f0e6d0] px-5 py-3 rounded-full text-[13px]">Salvar produto</button>
          <button className="px-5 py-3 rounded-full border text-[13px]">Gerar etiqueta & QR</button>
        </div>
      </div>
      <div className="bg-white rounded-[22px] border border-[#e4d6bf] p-5">
        <div className="text-[15px] font-[600]">Formação automática de preço</div>
        <div className="mt-4 space-y-3 text-[13px]">
          <label className="block">
            <div className="text-[11px] text-zinc-600">Preço de custo</div>
            <input type="number" value={cost} onChange={e=>setCost(+e.target.value||0)} className="w-full border rounded-[10px] px-3 py-2 mt-1"/>
          </label>
          <label className="block">
            <div className="text-[11px] text-zinc-600">Markup %</div>
            <input type="number" value={markup} onChange={e=>setMarkup(+e.target.value||0)} className="w-full border rounded-[10px] px-3 py-2 mt-1"/>
          </label>
          <div className="rounded-[14px] bg-[#f6f1e3] border border-[#ead9b4] px-4 py-4">
            <div className="text-[11px]">Preço final sugerido</div>
            <div className="text-[28px]" style={{fontFamily:'"Fraunces",serif'}}>{brl(price)}</div>
            <div className="text-[12px] text-zinc-600">Margem bruta {markup}% · Lucro {brl(price-cost)}</div>
          </div>
          <button className="w-full border rounded-full py-2 text-[13px]">Aplicar ao produto</button>
        </div>
      </div>
    </div>
  )
}

function ModuleConsignado(){
  const items = [
    {prop:'Juliana Meirelles', cpf:'***.482.991-**', pecas:8, vendidas:5, receber:'R$ 1.240,00', prazo:'12 dias'},
    {prop:'Camila Braga', cpf:'***.332.110-**', pecas:14, vendidas:9, receber:'R$ 3.180,00', prazo:'6 dias'},
    {prop:'Renata F.', cpf:'***.912.221-**', pecas:6, vendidas:2, receber:'R$ 620,00', prazo:'28 dias'},
  ]
  return (
    <div className="bg-white rounded-[22px] border border-[#e4d6bf] p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="text-[16px] font-[600]">Consignado Inteligente</div>
        <button className="text-[12px] px-3 py-1.5 border rounded-full">+ Novo consignante</button>
      </div>
      <div className="overflow-auto">
        <table className="w-full text-[13px]">
          <thead className="text-zinc-500">
            <tr className="border-b">{['Proprietário','CPF','Peças','Vendidas','A receber','Prazo','Comissão'].map(h=><th key={h} className="text-left py-2 pr-4">{h}</th>)}</tr>
          </thead>
          <tbody>
            {items.map(it=>(
              <tr key={it.prop} className="border-b border-[#f1e4cf]">
                <td className="py-3 pr-4 font-[500]">{it.prop}</td>
                <td className="py-3 pr-4">{it.cpf}</td>
                <td className="py-3 pr-4">{it.pecas}</td>
                <td className="py-3 pr-4">{it.vendidas}</td>
                <td className="py-3 pr-4">{it.receber}</td>
                <td className="py-3 pr-4">{it.prazo}</td>
                <td className="py-3 pr-4">Loja 35% · Prop 65%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-[12px] text-zinc-600 mt-3">Controle automático: Vendidas · Disponíveis · Devolvidas · Aguardando pagamento · Pagamento realizado · Contrato + recibo em PDF + assinatura digital.</div>
    </div>
  )
}

function ModuleVendors(){
  return (
    <div className="grid lg:grid-cols-2 gap-5">
      {[
        {tipo:'Pessoa Física', campos:['Nome','CPF','RG','Endereço','Telefone','E-mail','PIX']},
        {tipo:'Pessoa Jurídica', campos:['Razão Social','Nome Fantasia','CNPJ','Inscrição Estadual','Endereço','Telefone','E-mail','PIX']}
      ].map(b=>(
        <div key={b.tipo} className="bg-white rounded-[22px] border border-[#e4d6bf] p-5">
          <div className="text-[15px] font-[600] mb-3">{b.tipo}</div>
          <div className="grid sm:grid-cols-2 gap-3 text-[12.5px]">
            {b.campos.map(c=>(
              <input key={c} placeholder={c} className="border border-[#dbcba7] rounded-[10px] px-3 py-2 bg-[#fdfbf6] outline-none"/>
            ))}
          </div>
          <div className="flex gap-2 mt-4 text-[12px]">
            <button className="bg-[#161815] text-[#f0e6d0] px-4 py-2 rounded-full">Salvar fornecedor</button>
            <button className="px-4 py-2 border rounded-full">Gerar recibo & contrato</button>
          </div>
        </div>
      ))}
    </div>
  )
}

function ModuleCRM(){
  return (
    <div className="grid xl:grid-cols-[1.1fr_.9fr] gap-5">
      <div className="bg-white rounded-[22px] border border-[#e4d6bf] p-5">
        <div className="text-[16px] font-[600] mb-3">CRM Inteligente · Ranking de clientes</div>
        <table className="w-full text-[13px]">
          <thead className="text-zinc-500"><tr className="border-b">
            {['Cliente','CPF','Compras','Ticket','Última','Crédito'].map(h=><th key={h} className="py-2 pr-3 text-left">{h}</th>)}
          </tr></thead>
          <tbody>
            {[
              ['Marina S.','***.991-**','14','R$ 521','2d','R$ 450'],
              ['Isabela F.','***.110-**','9','R$ 410','5d','R$ 0'],
              ['Carolina P.','***.332-**','21','R$ 682','hoje','R$ 980'],
              ['Luana R.','***.441-**','5','R$ 298','11d','R$ 120']
            ].map(r=>(
              <tr key={r[0]} className="border-b border-[#f1e4cf]"><td className="py-2.5 pr-3 font-[500]">{r[0]}</td>{r.slice(1).map((v,i)=><td key={i} className="py-2.5 pr-3">{v}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded-[22px] border border-[#e4d6bf] p-5">
        <div className="text-[15px] font-[600] mb-3">Ficha Cura · Carolina P.</div>
        <div className="text-[13px] space-y-2 text-zinc-700">
          <div>Preferências: Vestidos M, neutros, seda, premium</div>
          <div>Frequência: 2,1x / mês · Ticket médio R$ 682</div>
          <div>Aniversário: 22/08 · cliente VIP</div>
          <div>WhatsApp: (21) 98888-4422</div>
          <div>Histórico: 21 compras · R$ 14.322 acumulado</div>
        </div>
        <div className="mt-4 flex gap-2 text-[12px]">
          <button className="px-3 py-2 border rounded-full">Enviar novidade</button>
          <button className="px-3 py-2 border rounded-full">Lembrete crediário</button>
          <button className="px-3 py-2 bg-[#161815] text-[#f0e6d0] rounded-full">WhatsApp</button>
        </div>
      </div>
    </div>
  )
}

function ModuleFinanceiro(){
  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-4 gap-4">
        <Kpi label="FLUXO DE CAIXA" value="R$ 62,8k" delta="+9,2%" up icon={<RefreshCw size={14}/>}/>
        <Kpi label="CONTAS A PAGAR" value="R$ 18,4k" delta="7 vencendo" icon={<ArrowDownRight size={14}/>}/>
        <Kpi label="CONTAS A RECEBER" value="R$ 31,1k" delta="+4 consign." up icon={<ArrowUpRight size={14}/>}/>
        <Kpi label="LUCRO LÍQ." value="R$ 46,9k" delta="31,4%" up icon={<CircleDollarSign size={14}/>}/>
      </div>
      <div className="bg-white rounded-[22px] border border-[#e4d6bf] p-5">
        <div className="text-[15px] font-[600] mb-3">Receitas × Despesas</div>
        <div className="h-[270px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={finCash}>
              <CartesianGrid vertical={false} stroke="#eee"/>
              <XAxis dataKey="m" fontSize={12}/>
              <YAxis fontSize={12}/>
              <Tooltip/>
              <Bar dataKey="rec" fill="#243527" radius={[5,5,0,0]} name="Receitas"/>
              <Bar dataKey="desp" fill="#d5b87b" radius={[5,5,0,0]} name="Despesas"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

function ModulePreco(){
  const [cost,setCost] = useState(20)
  const [markup,setMarkup] = useState(150)
  const final = Math.round(cost * (1+markup/100))
  return (
    <div className="max-w-[820px] bg-white rounded-[22px] border border-[#e4d6bf] p-6">
      <div className="text-[17px] font-[600] mb-1">Calculadora de Preço Cura</div>
      <div className="text-[13px] text-zinc-600 mb-4">Preço de Custo × Percentual de Lucro = Preço Final</div>
      <div className="grid sm:grid-cols-3 gap-4">
        <label>
          <div className="text-[11px] text-zinc-600">Custo</div>
          <input type="number" className="w-full border rounded-[10px] px-3 py-2 mt-1" value={cost} onChange={e=>setCost(+e.target.value||0)}/>
        </label>
        <label>
          <div className="text-[11px] text-zinc-600">Markup %</div>
          <input type="number" className="w-full border rounded-[10px] px-3 py-2 mt-1" value={markup} onChange={e=>setMarkup(+e.target.value||0)}/>
        </label>
        <div className="sm:col-span-1">
          <div className="text-[11px] text-zinc-600">Preço Final</div>
          <div className="mt-1 text-[26px]" style={{fontFamily:'"Fraunces",serif'}}>{brl(final)}</div>
        </div>
      </div>
      <div className="text-[12.5px] text-zinc-700 mt-4 bg-[#f8f4e8] border border-[#ead6ad] rounded-[12px] px-4 py-3">
        Exemplo: Custo: R$ 20,00 · Markup: 150% · Preço Final: R$ 50,00
      </div>
    </div>
  )
}

function ModuleMarketing(){
  return (
    <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-5">
      <div className="bg-white rounded-[22px] border border-[#e4d6bf] p-5">
        <div className="text-[16px] font-[600] mb-3">Campanhas · Email & WhatsApp</div>
        <div className="text-[13px] space-y-3">
          {[
            {t:'Drop Inverno Premium', a:'1.284 contatos', o:'48% abertura'},
            {t:'Aniversariantes Maio', a:'86 clientes', o:'WhatsApp'},
            {t:'VIP Reativação', a:'214 clientes', o:'Segmentado'}
          ].map(c=>(
            <div key={c.t} className="flex items-center justify-between border border-[#ead7b5] rounded-[12px] px-4 py-3 bg-[#fffcf5]">
              <div>
                <div className="font-[500]">{c.t}</div>
                <div className="text-zinc-600 text-[12px]">{c.a} · {c.o}</div>
              </div>
              <button className="text-[12px] border px-3 py-1.5 rounded-full">Editar</button>
            </div>
          ))}
        </div>
        <button className="mt-4 text-[13px] bg-[#161815] text-[#f2e9d6] px-4 py-2 rounded-full">+ Nova campanha</button>
      </div>
      <div className="bg-white rounded-[22px] border border-[#e4d6bf] p-5">
        <div className="text-[15px] font-[600] mb-2">Editor visual · Template</div>
        <div className="border border-[#dbc99f] rounded-[14px] bg-[#fdf8ee] h-[220px] flex items-center justify-center text-[13px] text-zinc-600">
          Editor drag & drop profissional<br/>• Novidades • Promoções • Aniversariantes • VIP
        </div>
      </div>
    </div>
  )
}

function ModuleBI(){
  const bi = [
    {m:'Jan', vendas: 48},{m:'Fev', vendas:52},{m:'Mar', vendas:61},{m:'Abr', vendas:57},{m:'Mai', vendas:70},{m:'Jun', vendas:78},
  ]
  return (
    <div className="space-y-5">
      <div className="text-[16px] font-[600]">Inteligência Empresarial · Painéis Corporativos</div>
      <div className="grid xl:grid-cols-2 gap-5">
        {[
          {t:'Financeiro', col:'#243527'},
          {t:'Estoque', col:'#9d742c'},
          {t:'Clientes', col:'#3b5d46'},
          {t:'Consignados', col:'#714d23'},
        ].map(p=>(
          <div key={p.t} className="bg-white rounded-[22px] border border-[#e4d6bf] p-5">
            <div className="text-[14px] font-[600] mb-2">{p.t}</div>
            <div className="h-[156px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bi}>
                  <XAxis dataKey="m" hide/>
                  <YAxis hide/>
                  <Tooltip/>
                  <Line type="monotone" dataKey="vendas" stroke={p.col} strokeWidth={2} dot={false}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
      <div className="text-[12px] text-zinc-600">Gráficos profissionais · Indicadores · Exportação PDF / Excel / CSV / JSON</div>
    </div>
  )
}

function ModulePrint(){
  return (
    <div className="bg-white rounded-[22px] border border-[#e4d6bf] p-5">
      <div className="text-[16px] font-[600] mb-3">Impressão Profissional</div>
      <div className="grid sm:grid-cols-3 gap-4 text-[13px]">
        {[
          'Impressoras Térmicas','Impressoras Comerciais','A4 / Etiquetas',
          'Código de Barras','QR Code','Cupom de Venda',
          'Recibos','Contratos','Relatórios / Notas'
        ].map(i=>(
          <div key={i} className="border border-[#e5d4b8] rounded-[12px] px-4 py-3 bg-[#fdfbf4]">{i}</div>
        ))}
      </div>
      <div className="text-[12px] text-zinc-600 mt-4">Pronto para futuras integrações fiscais · NF-e / NFC-e / SAT</div>
    </div>
  )
}

function ModuleBackup(){
  return (
    <div className="grid lg:grid-cols-[1fr_.9fr] gap-5">
      <div className="bg-white rounded-[22px] border border-[#e4d6bf] p-5">
        <div className="text-[16px] font-[600] mb-2">Backup Inteligente</div>
        <ul className="text-[13px] space-y-2">
          <li>✔ Backup automático diário · 04:12</li>
          <li>✔ Backup semanal · domingo</li>
          <li>✔ Backup mensal arquivado</li>
          <li>✔ Exportação: PDF · Excel · CSV · JSON</li>
          <li>✔ Backup Local + Nuvem Supabase</li>
          <li>✔ LGPD Ready · criptografia AES-256</li>
        </ul>
        <div className="mt-4 flex gap-2 text-[12px]">
          <button className="px-4 py-2 border rounded-full">Backup manual agora</button>
          <button className="px-4 py-2 bg-[#161815] text-[#f2e9d6] rounded-full">Exportar tudo</button>
        </div>
      </div>
      <div className="bg-[#fdf6e6] border border-[#e9d29b] rounded-[22px] p-5">
        <div className="text-[14px] font-[600] text-[#6b4a14]">Mensagem institucional</div>
        <p className="mt-2 text-[13.5px] text-[#5a4220]">"Seus dados são o patrimônio digital da empresa. Mantenha sempre uma cópia segura."</p>
        <div className="mt-4 text-[12px] text-zinc-700">Status: <span className="text-emerald-700 font-[600]">✓ Integridade verificada</span><br/>Última verificação: hoje 14:18 · 1.284 produtos · 1.420 clientes</div>
      </div>
    </div>
  )
}

export default function App(){
  const [mode,setMode] = useState<'store'|'admin'>('store')
  return mode==='store'
    ? <StoreFront onOpenPanel={()=>setMode('admin')} />
    : <AdminShell onCloseStore={()=>setMode('store')} />
}
