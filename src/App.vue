<script setup>
import { ref, onMounted, watch, nextTick, onUnmounted } from 'vue'
import MenuPage from './components/MenuPage.vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'


gsap.registerPlugin(ScrollTrigger)

const isMenuOpen = ref(false)
const currentPage = ref('home')
const canvasRef = ref(null)

// 建立一個變數來儲存 ScrollTrigger 實例，方便之後清理
let stInstance = null 

// 1. 將動畫邏輯獨立成一個函數
const initCanvasAnimation = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const context = canvas.getContext('2d')

  const frameCount = 105
  const currentFrame = index => `${import.meta.env.BASE_URL}coffee-sequence/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`

  const images = []
  const playhead = { frame: 0 }

  for (let i = 0; i < frameCount; i++) {
    const img = new Image()
    img.src = currentFrame(i)
    images.push(img)
  }

  images[0].onload = () => {
    canvas.width = images[0].naturalWidth
    canvas.height = images[0].naturalHeight
    render()
  }

  function render() {
    const img = images[playhead.frame]
    
    // 💡 強化防護：如果圖片不存在、還沒載入完、或者是壞掉的，就先不要畫！
    if (!img || !img.complete || img.naturalWidth === 0) return 
    
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.drawImage(img, 0, 0, canvas.width, canvas.height)
  }

  // 如果有舊的動畫，先清理掉
  if (stInstance) {
    stInstance.kill()
  }

  // 建立新的 GSAP 動畫
  const animation = gsap.to(playhead, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      trigger: "#canvas-container",
      start: "top 64px", 
      end: "+=1000",
      scrub: 0.5,
      pin: true,
    },
    onUpdate: render
  })

  // 儲存這個 ScrollTrigger 實例
  stInstance = animation.scrollTrigger
}

// 2. 監聽 currentPage 的變化
watch(currentPage, async (newPage) => {
  if (newPage === 'home') {
    // 等待 Vue 把包含 canvas 的 DOM 重新渲染出來
    await nextTick() 
    initCanvasAnimation()
  } else {
    // 當離開 home 頁面時，銷毀 ScrollTrigger，避免記憶體洩漏或影響 Menu 頁面的滾動
    if (stInstance) {
      stInstance.kill()
      stInstance = null
    }
  }
})

// 3. 初始載入
onMounted(() => {
  if (currentPage.value === 'home') {
    initCanvasAnimation()
  }
})

// 4. 組件完全卸載時的防護清理
onUnmounted(() => {
  if (stInstance) stInstance.kill()
})
</script>

<template>
  <div class="min-h-screen bg-bgLight">
    
    <header class="sticky top-0 z-50 bg-bgLight/90 backdrop-blur-sm border-b border-beige/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          
          <div class="flex-shrink-0 flex items-center cursor-pointer" @click="currentPage = 'home'">
            <h1 class="font-heading text-xl font-bold text-primary tracking-wider">F & A Coffee</h1>
          </div>
          
          <nav class="hidden md:flex space-x-8">
            <a href="#" @click.prevent="currentPage = 'menu'" class="text-secondary hover:text-wood transition-colors text-sm font-medium">Menu</a>
            <a href="#" @click.prevent="currentPage = 'home'" class="text-secondary hover:text-wood transition-colors text-sm font-medium">Home</a>
            <a href="#" @click.prevent="currentPage = 'home'" class="text-secondary hover:text-wood transition-colors text-sm font-medium">Visit</a>
            <a href="#" @click.prevent="currentPage = 'home'" class="text-secondary hover:text-wood transition-colors text-sm font-medium">Contact</a>
          </nav>

          <div class="md:hidden flex items-center">
            <button @click="isMenuOpen = !isMenuOpen" class="text-primary hover:text-wood focus:outline-none p-2">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div v-show="isMenuOpen" class="md:hidden bg-bgLight border-b border-beige">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#" @click.prevent="currentPage = 'menu'; isMenuOpen = false" class="block px-3 py-2 text-base font-medium text-secondary hover:text-wood hover:bg-beige/30 rounded-md">Menu</a>
          <a href="#" @click.prevent="currentPage = 'home'; isMenuOpen = false" class="block px-3 py-2 text-base font-medium text-secondary hover:text-wood hover:bg-beige/30 rounded-md">Home</a>
          <a href="#" @click.prevent="currentPage = 'home'; isMenuOpen = false" class="block px-3 py-2 text-base font-medium text-secondary hover:text-wood hover:bg-beige/30 rounded-md">Visit</a>
          <a href="#" @click.prevent="currentPage = 'home'; isMenuOpen = false" class="block px-3 py-2 text-base font-medium text-secondary hover:text-wood hover:bg-beige/30 rounded-md">Contact</a>
        </div>
      </div>
    </header>

    <main v-if="currentPage === 'home'">
      
    <section class="relative h-[calc(100vh-64px)] flex items-center justify-center">
        <div class="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2000&auto=format&fit=crop" 
            alt="Coffee shop interior" 
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
        </div>
        <div class="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto mt-16">
          <h2 class="font-heading text-4xl sm:text-5xl md:text-6xl text-bgLight mb-4 leading-tight drop-shadow-md">
            一杯咖啡，<br class="sm:hidden" />一段剛剛好的日常
          </h2>
          <p class="mt-4 text-base sm:text-lg text-beige mb-8 max-w-xl mx-auto font-light tracking-wide">
            手沖咖啡、自家甜點、安靜空間。<br />適合慢下來，也適合重新出發。
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#" @click.prevent="currentPage = 'menu'" class="inline-flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-sm text-bgLight bg-primary hover:bg-wood transition-colors duration-300 shadow-sm">
              查看菜單
            </a>
            <a href="#" class="inline-flex justify-center items-center px-8 py-3 border border-bgLight text-base font-medium rounded-sm text-bgLight bg-transparent hover:bg-bgLight hover:text-primary transition-colors duration-300">
              前往店舖
            </a>
          </div>
        </div>
      </section>
      <div id="canvas-container" class="relative w-full h-[calc(100vh-64px)] bg-primary overflow-hidden">
        
        <div class="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          <span class="text-xs sm:text-sm font-medium tracking-widest text-wood uppercase mb-4 drop-shadow-md">Craftsmanship</span>
          <h2 class="text-3xl md:text-5xl font-heading text-bgLight tracking-widest drop-shadow-lg text-center leading-tight">
            每一杯，<br class="md:hidden">都是專注的藝術
          </h2>
        </div>

        <div class="absolute inset-0 bg-primary/20 z-0 pointer-events-none"></div>
        
        <canvas ref="canvasRef" class="w-full h-full object-cover"></canvas>
      </div>  
      <section class="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div class="space-y-6 px-2 sm:px-0">
            <span class="text-xs sm:text-sm font-medium tracking-widest text-wood uppercase">About the Café</span>
            <h2 class="text-2xl sm:text-3xl md:text-4xl leading-relaxed text-primary">
              給喜歡咖啡、甜點與安靜空間的人，一個會想再回來的地方。
            </h2>
            <div class="w-12 h-px bg-wood/50 my-6"></div>
            <p class="text-sm sm:text-base leading-loose text-secondary/85">
              我們相信，一間好的咖啡店，不只是提供一杯飲品，而是提供一段舒服的停留。
              <br><br>
              從咖啡豆的選擇，到店內光線、音樂與甜點搭配，我們希望每一次到訪，都讓你覺得自然、放鬆，而且值得。
            </p>
          </div>
          <div class="relative h-[80vw] md:h-[500px] w-full overflow-hidden rounded-sm shadow-sm group">
            <img 
              src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1200&auto=format&fit=crop" 
              alt="Cafe details" 
              class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
            >
          </div>
        </div>
      </section>
      
      <section class="py-16 sm:py-24 bg-white/40 border-y border-beige/40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <div class="space-y-3 text-center md:text-left px-4 md:px-0">
              <span class="font-heading text-5xl text-beige/70 block mb-4 md:mb-6">01</span>
              <h3 class="text-lg sm:text-xl font-medium text-primary tracking-wide">手作咖啡</h3>
              <p class="text-secondary/75 leading-relaxed text-sm sm:text-base max-w-[250px] mx-auto md:mx-0">
                選用精品咖啡豆，提供 espresso、手沖與季節特調。
              </p>
            </div>
            <div class="space-y-3 text-center md:text-left px-4 md:px-0 md:border-l md:border-beige/50 md:pl-8 lg:pl-12">
              <span class="font-heading text-5xl text-beige/70 block mb-4 md:mb-6">02</span>
              <h3 class="text-lg sm:text-xl font-medium text-primary tracking-wide">自家甜點</h3>
              <p class="text-secondary/75 leading-relaxed text-sm sm:text-base max-w-[250px] mx-auto md:mx-0">
                每日供應巴斯克芝士蛋糕、可麗露及限定甜品。
              </p>
            </div>
            <div class="space-y-3 text-center md:text-left px-4 md:px-0 md:border-l md:border-beige/50 md:pl-8 lg:pl-12">
              <span class="font-heading text-5xl text-beige/70 block mb-4 md:mb-6">03</span>
              <h3 class="text-lg sm:text-xl font-medium text-primary tracking-wide">舒適空間</h3>
              <p class="text-secondary/75 leading-relaxed text-sm sm:text-base max-w-[250px] mx-auto md:mx-0">
                木質調座位、自然採光，適合朋友相聚，也適合自己放空。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 md:mb-16">
          <span class="text-xs sm:text-sm font-medium tracking-widest text-wood uppercase block mb-3">Signature Selection</span>
          <h2 class="text-2xl sm:text-3xl md:text-4xl text-primary font-heading">
            本店招牌推薦
          </h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8">
          <div class="group cursor-pointer flex flex-col">
            <div class="relative w-full aspect-[4/5] overflow-hidden rounded-sm mb-5 bg-beige/30">
              <img src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=800&auto=format&fit=crop" alt="海鹽焦糖拿鐵" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 group-hover:opacity-90 transition-all duration-700 ease-out">
            </div>
            <h3 class="text-lg font-medium text-primary mb-2 transition-colors group-hover:text-wood">海鹽焦糖拿鐵</h3>
            <p class="text-sm text-secondary/75 leading-relaxed flex-grow">濃縮咖啡配上海鹽奶蓋，口感平衡，甜而不膩。</p>
          </div>
          <div class="group cursor-pointer flex flex-col mt-0 sm:mt-8 lg:mt-12">
            <div class="relative w-full aspect-[4/5] overflow-hidden rounded-sm mb-5 bg-beige/30">
              <img src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800&auto=format&fit=crop" alt="手沖單品" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 group-hover:opacity-90 transition-all duration-700 ease-out">
            </div>
            <h3 class="text-lg font-medium text-primary mb-2 transition-colors group-hover:text-wood">精選單品手沖</h3>
            <p class="text-sm text-secondary/75 leading-relaxed flex-grow">每月更換單一產區豆單，精準溫控，保留最純粹的花果香氣。</p>
          </div>
          <div class="group cursor-pointer flex flex-col">
            <div class="relative w-full aspect-[4/5] overflow-hidden rounded-sm mb-5 bg-beige/30">
              <img src="https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=800&auto=format&fit=crop" alt="巴斯克芝士蛋糕" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 group-hover:opacity-90 transition-all duration-700 ease-out">
            </div>
            <h3 class="text-lg font-medium text-primary mb-2 transition-colors group-hover:text-wood">巴斯克芝士蛋糕</h3>
            <p class="text-sm text-secondary/75 leading-relaxed flex-grow">外層微焦，內裡柔軟，適合配黑咖啡一起享用。</p>
          </div>
          <div class="group cursor-pointer flex flex-col mt-0 sm:mt-8 lg:mt-12">
            <div class="relative w-full aspect-[4/5] overflow-hidden rounded-sm mb-5 bg-beige/30">
              <img src="https://images.unsplash.com/photo-1612203985729-70726954388c?q=80&w=800&auto=format&fit=crop" alt="法式可麗露" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 group-hover:opacity-90 transition-all duration-700 ease-out">
            </div>
            <h3 class="text-lg font-medium text-primary mb-2 transition-colors group-hover:text-wood">法式經典可麗露</h3>
            <p class="text-sm text-secondary/75 leading-relaxed flex-grow">外脆內軟的法式經典，每日限量新鮮出爐。</p>
          </div>
        </div>
        <div class="text-center mt-12 md:mt-16">
          <a href="#" @click.prevent="currentPage = 'menu'" class="inline-flex items-center text-wood hover:text-primary transition-colors text-sm font-medium tracking-wide group">
            查看完整菜單 
            <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </section>

      <section class="py-20 md:py-32 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 text-center md:text-left">
            <div class="max-w-2xl">
              <span class="text-xs sm:text-sm font-medium tracking-widest text-wood uppercase block mb-3">A space to slow down</span>
              <h2 class="text-2xl sm:text-3xl md:text-4xl text-primary font-heading leading-tight">
                留一點時間，<br class="hidden md:block" />給自己慢下來
              </h2>
            </div>
            <p class="text-sm sm:text-base text-secondary/75 leading-relaxed max-w-sm mx-auto md:mx-0 md:text-right">
              陽光、音樂、木質氣味與咖啡香，<br class="hidden sm:block" />是很多客人喜歡回來的理由。
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div class="md:col-span-2 h-[60vw] md:h-[600px] overflow-hidden rounded-sm group relative bg-beige/30">
              <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop" alt="靠窗座位與自然光" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out">
            </div>
            <div class="grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-6 h-auto md:h-[600px]">
              <div class="overflow-hidden rounded-sm h-[40vw] md:h-full group bg-beige/30 relative">
                <img src="https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg?auto=compress&cs=tinysrgb&w=800" alt="手沖咖啡細節" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out">
              </div>
              <div class="overflow-hidden rounded-sm h-[40vw] md:h-full group bg-beige/30 relative">
                <img src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=800&auto=format&fit=crop" alt="木質空間細節" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out">
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-16 md:py-24 bg-bgLight border-y border-beige/40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-white rounded-sm shadow-sm overflow-hidden flex flex-col md:flex-row items-stretch">
            <div class="w-full md:w-1/2 p-8 sm:p-12 md:p-16 flex flex-col justify-center text-center md:text-left order-2 md:order-1">
              <span class="text-xs sm:text-sm font-medium tracking-widest text-wood uppercase block mb-3">Seasonal Pick</span>
              <h2 class="text-2xl sm:text-3xl font-heading text-primary mb-5 leading-snug">
                春季限定：<br class="hidden sm:block md:hidden" />草莓拿鐵與焙茶芝士蛋糕
              </h2>
              <p class="text-sm sm:text-base text-secondary/75 leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
                每個月份，我們都會準備一點新的味道，讓熟客每次再來都有新鮮感。限時供應至本月底。
              </p>
              <div>
                <a href="#" class="inline-flex justify-center items-center px-6 py-2.5 border border-primary text-sm font-medium rounded-sm text-primary hover:bg-primary hover:text-bgLight transition-colors duration-300">
                  查看本月推薦
                </a>
              </div>
            </div>
            <div class="w-full md:w-1/2 h-[60vw] md:h-auto order-1 md:order-2 relative bg-beige/30">
              <img src="https://images.unsplash.com/photo-1495147466023-af5c19cb3738?q=80&w=1000&auto=format&fit=crop" alt="季節限定甜點與飲品" class="absolute inset-0 w-full h-full object-cover">
            </div>
          </div>
        </div>
      </section>

      <section class="py-20 md:py-32 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div class="space-y-10 px-2 sm:px-0 text-center md:text-left">
              <div>
                <span class="text-xs sm:text-sm font-medium tracking-widest text-wood uppercase block mb-3">Visit Us</span>
                <h2 class="text-3xl md:text-4xl font-heading text-primary mb-4">F & A Coffee</h2>
                <p class="text-sm sm:text-base text-secondary/80">澳門氹仔某某街 18 號地下</p>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
                <div class="bg-bgLight/50 p-6 rounded-sm">
                  <h3 class="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                    <svg class="w-4 h-4 text-wood" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    營業時間
                  </h3>
                  <p class="text-sm text-secondary/80 leading-loose">
                    星期一至五 <span class="font-medium text-primary">08:00 – 19:00</span><br>
                    星期六及日 <span class="font-medium text-primary">09:00 – 20:00</span><br>
                    <span class="text-xs text-wood mt-1 block">*逢星期二休息</span>
                  </p>
                </div>
                <div class="bg-bgLight/50 p-6 rounded-sm">
                  <h3 class="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                    <svg class="w-4 h-4 text-wood" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    聯絡我們
                  </h3>
                  <div class="text-sm text-secondary/80 space-y-3">
                    <p>電話：<a href="tel:+85328000000" class="hover:text-wood transition-colors">+853 28XX XXXX</a></p>
                    <p>WhatsApp：<a href="https://wa.me/85360000000" class="hover:text-wood transition-colors">+853 6XXX XXXX</a></p>
                    <p>Instagram：<a href="#" class="hover:text-wood transition-colors">@oakanddawn.coffee</a></p>
                  </div>
                </div>
              </div>
              <div class="pt-2 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href="#" class="inline-flex justify-center items-center px-8 py-3 bg-primary text-bgLight text-sm font-medium rounded-sm hover:bg-wood transition-colors duration-300 shadow-sm">Google 地圖導航</a>
                <a href="#" class="inline-flex justify-center items-center px-8 py-3 border border-primary text-primary text-sm font-medium rounded-sm hover:bg-primary/5 transition-colors duration-300">WhatsApp 查詢</a>
              </div>
            </div>
            <div class="h-[60vw] md:h-[500px] w-full bg-beige/40 rounded-sm overflow-hidden relative group shadow-sm">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" alt="店舖地圖位置" class="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000 ease-in-out">
              <div class="absolute inset-0 bg-primary/10 transition-colors group-hover:bg-transparent"></div>
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <span class="bg-bgLight/90 backdrop-blur-sm text-primary px-6 py-2.5 text-sm font-medium tracking-widest uppercase rounded-sm shadow-lg">View on Map</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <MenuPage v-if="currentPage === 'menu'" />

    <footer class="bg-primary text-bgLight py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center space-y-6">
        <h2 class="font-heading text-2xl tracking-widest cursor-pointer" @click="currentPage = 'home'">F & A Coffee</h2>
        <p class="text-bgLight/70 text-sm max-w-sm mx-auto font-light leading-relaxed">
          Coffee, comfort, and a little quiet in Macau.
        </p>
        <div class="flex space-x-8 pt-2">
          <a href="#" class="text-bgLight/60 hover:text-white transition-colors text-sm uppercase tracking-wider">Instagram</a>
          <a href="#" class="text-bgLight/60 hover:text-white transition-colors text-sm uppercase tracking-wider">WhatsApp</a>
          <a href="#" class="text-bgLight/60 hover:text-white transition-colors text-sm uppercase tracking-wider">Facebook</a>
        </div>
        <div class="w-8 h-px bg-bgLight/20 my-4"></div>
        <p class="text-xs text-bgLight/40 font-light tracking-wide">
          © 2026 F & A Coffee. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>