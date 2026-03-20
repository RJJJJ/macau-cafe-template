<script setup>
// 將 PDF 菜單資料結構化，方便你未來隨時修改價格
const blackCoffee = [
  { name: '美式咖啡 AMERICANO', hot: '32', iced: '34' },
  { name: '意式特濃咖啡 ESPRESSO', hot: '25', iced: '-' },
  { name: '湯力咖啡 ESPRESSO TONIC', hot: '-', iced: '42' },
  { name: '椰子水黑咖啡 COCONUT WATER ESPRESSO', hot: '-', iced: '42' },
  { name: '流沙冰美式 CREAMY BLACK', hot: '-', iced: '36' },
  { name: '黑糖薑美式 BROWN SUGAR GINGER AMERICANO', hot: '40', iced: '-' },
  { name: '伯爵流沙冰美式 EARL GREY CREAMY BLACK', hot: '-', iced: '42' }, // 假設價格
  { name: '冷泡咖啡 COLD BREW COFFEE', hot: '-', iced: '38' } // 假設價格
]

const whiteCoffee = [
  { name: '卡布奇諾 CAPPUCCINO', hot: '38', iced: '-' },
  { name: '拿鐵 LATTE', hot: '38', iced: '40' },
  { name: '澳白 FLAT WHITE', hot: '38', iced: '-' },
  { name: '摩卡 MOCHA', hot: '44', iced: '46' },
  { name: '海鹽焦糖脆脆拿鐵 SALTED CARAMEL TOFFEE LATTE', hot: '44', iced: '46' },
  { name: '焦糖拿鐵 CARAMEL LATTE', hot: '40', iced: '42' },
  { name: '榛子拿鐵 HAZELNUT LATTE', hot: '40', iced: '42' },
  { name: '蘋果肉桂拿鐵 APPLE CINNAMON LATTE', hot: '40', iced: '42' },
  { name: '桂花拿鐵 OSMANTHUS LATTE', hot: '40', iced: '42' }
]

const nonCoffee = [
  { name: '朱古力奶 CHOCOLATE MILK', hot: '38', iced: '40' },
  { name: '鮮奶 FRESH MILK', hot: '24', iced: '26' },
  { name: '海鹽焦糖脆脆鮮奶 SALTED CARAMEL TOFFEE MILK', hot: '30', iced: '32' },
  { name: '抹茶拿鐵 MATCHA LATTE', hot: '38', iced: '40' },
  { name: '伯爵茶拿鐵 EARL GREY LATTE', hot: '38', iced: '40' },
  { name: '青檸梳打 LIME SODA', hot: '-', iced: '34' },
  { name: '青蘋果梳打 GREEN APPLE SODA', hot: '-', iced: '34' },
  { name: '覆盆子梳打 RASPBERRY SODA', hot: '-', iced: '34' },
  { name: '瑪莉伯爵梳打 ROSEMARY EARL GREY SODA', hot: '-', iced: '34' },
  { name: '泰國椰子水 COCONUT WATER', hot: '-', iced: '25' },
  { name: '有機洋甘菊茶 ORGANIC CAMOMILE TEA', hot: '30', iced: '-' },
  { name: '有機薄荷茶 / 伯爵茶 / 抹茶', hot: '30', iced: '-' },
  { name: '黑糖薑母茶 BROWN SUGAR GINGER TEA', hot: '36', iced: '-' },
  { name: '紅棗桂圓茶 RED DATE LONGAN TEA', hot: '36', iced: '-' }
]

const breads = [
  { name: '原味牛角包 CROISSANT', price: '15' },
  { name: '鹽可頌 SALTED BUTTER ROLL', price: '14' },
  { name: '原味貝果 BAGEL', price: '15' },
  { name: '蕃茄味貝果 TOMATO BAGEL', price: '17' },
  { name: '夏巴塔 CIAВAТТА', price: '15' }
]

const savoryFillings = [
  { name: '芝士 CHEESE', price: '+10' }, { name: '火腿 HAM', price: '+10' },
  { name: '牛油果 AVOCADO', price: '+15' }, { name: '吞拿魚 TUNA', price: '+18' },
  { name: '蛋沙律 EGG SALAD', price: '+18' }, { name: '忌廉芝士 CREAM CHEESE', price: '+12' },
  { name: '煙三文魚 SMOKED SALMON', price: '+28' }, { name: '田園黑椒牛肉', price: '+32' }
]
</script>

<template>
  <div class="py-20 md:py-32 bg-white min-h-screen">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center mb-16 space-y-4">
        <h2 class="font-heading text-3xl md:text-5xl text-primary tracking-widest">嘉飛 F&A Cafe</h2>
        <p class="text-sm tracking-widest text-wood uppercase">Chill With Coffee</p>
        <p class="text-xs text-secondary/60 mt-4">*以上價錢皆為澳門元 ALL PRICES ABOVE ARE IN MOP</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-24">
        
        <div class="space-y-16">
          <div>
            <h3 class="font-heading text-xl text-primary border-b border-wood pb-2 mb-6 flex justify-between">
              <span>黑咖啡 BLACK COFFEE</span>
              <span class="text-sm font-sans flex gap-4 text-wood"><span class="w-6 text-center">熱</span><span class="w-6 text-center">冷</span></span>
            </h3>
            <ul class="space-y-4">
              <li v-for="item in blackCoffee" :key="item.name" class="flex justify-between items-start group">
                <span class="text-sm text-secondary group-hover:text-wood transition-colors pr-4">{{ item.name }}</span>
                <span class="text-sm font-medium text-primary flex gap-4">
                  <span class="w-6 text-right">{{ item.hot }}</span>
                  <span class="w-6 text-right">{{ item.iced }}</span>
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-heading text-xl text-primary border-b border-wood pb-2 mb-6 flex justify-between">
              <span>白咖啡 WHITE COFFEE</span>
              <span class="text-sm font-sans flex gap-4 text-wood"><span class="w-6 text-center">熱</span><span class="w-6 text-center">冷</span></span>
            </h3>
            <ul class="space-y-4">
              <li v-for="item in whiteCoffee" :key="item.name" class="flex justify-between items-start group">
                <span class="text-sm text-secondary group-hover:text-wood transition-colors pr-4">{{ item.name }}</span>
                <span class="text-sm font-medium text-primary flex gap-4">
                  <span class="w-6 text-right">{{ item.hot }}</span>
                  <span class="w-6 text-right">{{ item.iced }}</span>
                </span>
              </li>
            </ul>
            <p class="text-xs text-wood mt-6 tracking-wide">
              *轉燕麥奶 OAT MILK +MOP5<br>
              *EXTRA SHOT +MOP8
            </p>
          </div>
        </div>

        <div class="space-y-16">
          <div>
            <h3 class="font-heading text-xl text-primary border-b border-wood pb-2 mb-6 flex justify-between">
              <span>非咖啡類 NON-COFFEE</span>
              <span class="text-sm font-sans flex gap-4 text-wood"><span class="w-6 text-center">熱</span><span class="w-6 text-center">冷</span></span>
            </h3>
            <ul class="space-y-4">
              <li v-for="item in nonCoffee" :key="item.name" class="flex justify-between items-start group">
                <span class="text-sm text-secondary group-hover:text-wood transition-colors pr-4 flex-1">{{ item.name }}</span>
                <span class="text-sm font-medium text-primary flex gap-4 shrink-0">
                  <span class="w-6 text-right">{{ item.hot }}</span>
                  <span class="w-6 text-right">{{ item.iced }}</span>
                </span>
              </li>
            </ul>
          </div>

          <div class="bg-bgLight p-6 rounded-sm">
            <h3 class="font-heading text-xl text-primary mb-2 text-center">自選三文治</h3>
            <p class="text-xs text-wood text-center mb-6 tracking-wider">BUILD-YOUR-OWN SANDWICH</p>
            
            <div class="space-y-6">
              <div>
                <h4 class="text-sm font-bold text-primary mb-3">1. 選擇麵包 BREAD</h4>
                <ul class="space-y-2">
                  <li v-for="item in breads" :key="item.name" class="flex justify-between text-sm text-secondary">
                    <span>{{ item.name }}</span><span class="font-medium text-primary">{{ item.price }}</span>
                  </li>
                </ul>
              </div>
              
              <div class="w-full h-px bg-beige"></div>

              <div>
                <h4 class="text-sm font-bold text-primary mb-3">2. 自選鹹食餡料 SAVORY FILLINGS</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                  <div v-for="item in savoryFillings" :key="item.name" class="flex justify-between text-xs text-secondary">
                    <span>{{ item.name }}</span><span class="text-wood">{{ item.price }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>