import { Language } from '../types';

export const translations = {
  'zh-HK': {
    appTitle: 'Kidrise 星空探索者',
    subtitle: '小小天文學家的實時星圖',
    visitShop: '參觀商店',
    locationTitle: '觀測地點',
    myGps: '我的位置',
    hkDef: '香港 (預設)',
    viewingFrom: '目前觀測位置：',
    gpsLocation: 'GPS 定位',
    hongKong: '香港',
    timeTravel: '時光機',
    now: '現在',
    viewMode: '觀看模式',
    wideSky: '廣角星空',
    globe3d: '3D 星球',
    chatPlaceholder: '問問關於星星的問題...',
    chatThinking: '思考中...',
    chatError: '訊號干擾中！請再試一次。',
    chatTitle: '星空嚮導',
    chatSubtitle: '由 Gemini AI 驅動',
    tutorial: {
      welcomeTitle: '歡迎來到 Kidrise 星空探險號！',
      welcomeDesc: '我是你的 AI 副機長。準備好一起探索宇宙了嗎？',
      
      step1Title: '到處看看 (Look Around)',
      step1Desc: '用手指拖動來飛翔！雙指開合可以飛近或飛遠星星。★ 點擊任何一顆星星，就可以鎖定它並查看詳細資料喔！',
      
      step2Title: '任務控制台 (Mission Dock)',
      step2Desc: '這是你的主要控制台。隨時切換「星圖」、「規劃」、「學習」或「測驗」模式。',
      
      step3Title: '超級工具 (Super Tools)',
      step3Desc: '找不到星星？按下「指南針」圖案，將手機舉向天空，地圖就會自動跟隨你轉動，幫你定位真實的星星！',
      
      step4Title: '準備出發！',
      step4Desc: '就是這麼簡單！現在，以此地為起點，飛向浩瀚無垠的宇宙吧！',

      nextBtn: '下一步',
      prevBtn: '上一步',
      startBtn: '立刻出發！'
    },
    rendering: '渲染模式',
    askMe: '你好！我是你的 Kidrise 星空嚮導。你看到了甚麼星星？問問我吧！🌟',
    lat: '緯度',
    lon: '經度',
    // New buttons
    btnUpdateLoc: '更新位置',
    btnGyro: '開啟陀螺儀',
    btnGyroOff: '關閉陀螺儀',
    btnArt: '顯示圖案',
    // Directions
    dirN: '北',
    dirS: '南',
    dirE: '東',
    dirW: '西',
    gyroNotSupported: '您的裝置不支援或未授權陀螺儀功能。',
    locUpdated: '位置已更新！',
    sun: '太陽',
    moon: '月亮',
    // Controls
    btnZoomIn: '放大',
    btnZoomOut: '縮小',
    btnReset: '重置',
    btnPlay: '播放',
    btnPause: '暫停',
    btnSpeed: '快進',
    btnGo: '前往',
    // Menu
    menuMap: '星圖',
    menuPlanner: '規劃',
    menuCompass: '指南針',
    menuLearn: '學習',
    menuQuiz: '測驗',
    menuGuide: '百科', // New Guide Tab
    
    // Planner
    plannerTitle: '觀星規劃 (天文台實時數據)',
    weatherCurrent: '實時分區天氣',
    weather9Day: '未來九天天氣預報',
    stargazingIndex: '觀星指數',
    conditionGood: '適合觀星',
    conditionFair: '一般',
    conditionPoor: '不宜觀星',
    cloud: '雲量',
    rain: '降雨',
    temp: '溫度',
    humidity: '濕度',
    // Status Logic
    statusClear: '天朗氣清',
    statusCloudy: '多雲',
    statusRain: '有雨/風暴',
    statusStable: '天氣穩定',
    reasonCloud: '雲層可能會遮擋星空',
    reasonRain: '天氣惡劣',
    reasonMoon: '月光太亮影響深空觀測',
    reasonGood: '觀星條件極佳！',
    reasonFair: '條件一般',
    moonNew: '新月',
    moonWaxCres: '眉月',
    moonFirstQ: '上弦月',
    moonWaxGib: '盈凸月',
    moonFull: '滿月',
    moonWanGib: '虧凸月',
    moonLastQ: '下弦月',
    moonWanCres: '殘月',
    // Knowledge
    knowSolar: '太陽系大冒險',
    knowMoon: '月亮變變變',
    knowStar: '星星的秘密',
    knowBlackHole: '黑洞',
    knowMeteor: '流星雨',
    knowComet: '彗星',
    knowGalaxy: '星系',
    knowNebula: '星雲',
    knowEclipse: '日食/月食',
    knowConstellation: '星座',

    solarDesc: '去各大行星探險吧！',
    moonDesc: '為什麼月亮會變形？',
    starDesc: '星星顏色代表溫度？',
    blackHoleDesc: '連光都逃不掉的怪獸！',
    meteorDesc: '快點許願！',
    cometDesc: '拖著尾巴的髒雪球。',
    galaxyDesc: '星星居住的城市。',
    nebulaDesc: '星星與寶寶誕生的地方。',
    eclipseDesc: '宇宙的皮影戲。',
    constellationDesc: '天上的連連看遊戲。',
    
    // Constellation Game
    conGameLink: '將星星連起來！',
    conGameComplete: '太棒了！',
    conUrsaMajor: '大熊座 (北斗七星)',
    conCassiopeia: '仙后座',
    conOrion: '獵戶座',
    nextLevel: '下一關',
    restart: '再玩一次',

    // Space Scale
    scaleTitle: '宇宙體重機',
    enterWeight: '輸入你的體重 (kg)',
    scaleDesc: '看看你在別的星球會變多重！有些地方你會變超輕，有些地方這會把你壓扁喔！',
    pluto: '冥王星',

    // Elaborations
    solarContext: '想像一個大家庭圍著營火跑。太陽就是那個營火，行星就是圍著它跑的小朋友！',
    moonContext: '月亮其實不會變形！它像一個被手電筒（太陽）照著的球。當它繞著地球轉時，我們看到的亮面就會改變。',
    starContext: '星星是大火球。就像蠟燭的火焰一樣，藍色的部分其實最熱，紅色的部分反而比較「冷」喔！',

    // Star Guide
    // Guide
    btnBack: '返回',
    lblFind: '如何尋找',
    lblObserve: '觀測技巧',
    planetFact: '你知道嗎？',
    guideIntro: '探索著名恆星和天體。點擊卡片了解更多。',

    // Polaris
    guidePolaris: '北極星 (Polaris)',
    guidePolarisSub: '指北之星',
    guidePolarisDesc: '北極星非常特別，因為它在天空中的位置幾乎不變，而其他星星都繞著它轉。數百年來，水手們一直依靠它來辨別北方。',
    guidePolarisFind: '先找到北斗七星。將斗勺外側的兩顆星連成一線，向斗口方向延伸約五倍距離，就能找到北極星。',
    guidePolarisObserve: '它是一顆中等亮度的星星。即使在城市中，肉眼也能看見，但不算非常亮。',
    guidePolarisFact: '北極星其實是一個三合星系統，但它的伴星太暗了，需要望遠鏡才能看見。',

    // Sirius
    guideSirius: '天狼星 (Sirius)',
    guideSiriusSub: '夜空中最亮的星',
    guideSiriusDesc: '天狼星是全天最亮的恆星。它的名字源於希臘語，意為「發光」或「灼熱」。',
    guideSiriusFind: '先找到獵戶座腰帶（三顆連成一線的星）。沿著腰帶向左下方延伸，最亮的那顆就是天狼星。',
    guideSiriusObserve: '發出耀眼的藍白光芒。當它位置較低時，常會因為大氣擾動而閃爍出七彩光芒。',
    guideSiriusFact: '英語中「炎熱的狗日子」(Dog Days) 指的就是天狼星，因為古人認為它的熱量與太陽疊加導致了夏天的酷熱。',

    // Betelgeuse
    guideBetelgeuse: '參宿四 (Betelgeuse)',
    guideBetelgeuseSub: '紅色超巨星',
    guideBetelgeuseDesc: '參宿四是一顆巨大的紅色超巨星。如果不把它放在我們太陽系中心，它的表面會延伸到木星軌道之外！',
    guideBetelgeuseFind: '它是獵戶座左上角那顆明亮的橙紅色星星（獵人的肩膀）。',
    guideBetelgeuseObserve: '肉眼可見明顯的橙紅色。它是天空中最容易通過顏色辨認的星星之一。',
    guideBetelgeuseFact: '參宿四「很快」就會演化成超新星——在天文學上，「很快」意味著未來十萬年內。',

    // Orion Nebula
    guideOrionNebula: '獵戶座大星雲',
    guideOrionNebulaSub: '恆星托兒所',
    guideOrionNebulaDesc: '獵戶座大星雲是一團巨大的氣體和塵埃雲，新恆星正在那裡誕生。它是肉眼可見最亮的星雲之一。',
    guideOrionNebulaFind: '在獵戶座腰帶下方尋找「寶劍」。星雲位於寶劍中間那顆看起來毛茸茸的星星位置。',
    guideOrionNebulaObserve: '肉眼看去像一顆模糊的星星。用雙筒望遠鏡可以看到淡淡的霧氣。透過天文望遠鏡可見其扇形結構。',
    guideOrionNebulaFact: '它的直徑約 24 光年。我們今天看到的光，是在羅馬帝國衰落時期發出的。',

    // Pleiades
    guidePleiades: '以此七星團 (Pleiades)',
    guidePleiadesSub: '七姊妹星團',
    guidePleiadesDesc: '昴宿星團是一個美麗的疏散星團，由中年、高溫的 B 型恆星組成。通常人們會挑戰自己能數出幾顆星星。',
    guidePleiadesFind: '沿著獵戶座腰帶向右下方延伸，經過畢宿五，就能找到這個小小的星團。',
    guidePleiadesObserve: '看起來像一個迷你的斗勺。大多數人肉眼能看到 6 顆星，但用雙筒望遠鏡能看到數十顆。',
    guidePleiadesFact: '在日本，這個星團被稱為「Subaru」（昴），也是著名汽車品牌的標誌。',

    // Rigel
    guideRigel: '參宿七 (Rigel)',
    guideRigelSub: '藍色超巨星',
    guideRigelDesc: '參宿七是獵戶座中最亮的星 (比參宿四還亮)。它是一顆年輕、熾熱的藍色超巨星。',
    guideRigelFind: '它是獵戶座右下角那顆明亮的藍白色星星（獵人的腳）。',
    guideRigelObserve: '它發出強烈的藍白光。與橙紅色的參宿四形成強烈對比。',
    guideRigelFact: '參宿七非常亮，如果把它放在太陽的位置，我們都會被瞬間烤焦！它的亮度是太陽的數萬倍。',

    // Aldebaran
    guideAldebaran: '畢宿五 (Aldebaran)',
    guideAldebaranSub: '金牛座之眼',
    guideAldebaranDesc: '畢宿五是一顆橙色巨星，代表金牛座那一隻憤怒的眼睛。它的名字來自阿拉伯語，意為「追隨者」（追隨昴宿星團）。',
    guideAldebaranFind: '沿著獵戶座腰帶向右上方延伸，第一顆遇到的亮橙色星星就是它。',
    guideAldebaranObserve: '顏色是明顯的橙色。它位於一個V字形的星群（畢宿星團）中，但其實它比那個星團更靠近我們。',
    guideAldebaranFact: '先鋒10號探測器正朝著畢宿五的方向飛去，預計兩百萬年後會到達那裡。',

    // Arcturus
    guideArcturus: '大角星 (Arcturus)',
    guideArcturusSub: '牧夫座守護者',
    guideArcturusDesc: '大角星是北半球夜空中最亮的恆星（全天第四亮）。它是一顆橙色巨星。',
    guideArcturusFind: '沿著北斗七星斗柄的曲線延伸出去（春季大曲線），第一顆遇到的亮星就是大角星。',
    guideArcturusObserve: '它閃爍著金黃色或橙色的光芒。',
    guideArcturusFact: '大角星並不是「本地人」，它來自一個被銀河系吞併的矮星系，正快速穿越我們的銀河盤面。',
    
    // Vega
    guideVega: '織女一 (Vega)',
    guideVegaSub: '夏夜女王',
    guideVegaDesc: '織女一是夏季大三角中最亮的一顆星。它發出藍白色的光芒，曾經是我們的北極星（以後也會是）。',
    guideVegaFind: '在夏季的頭頂附近，尋找最亮的那顆藍白星。',
    guideVegaObserve: '非常明亮且呈現藍白色。它是天文學家用來定義「0等星」的標準星。',
    guideVegaFact: '因為地球自轉軸的擺動，大約在西元14000年，織女一將會取代現在的勾陳一成為新的北極星。',

    // Altair
    guideAltair: '河鼓二 (Altair)',
    guideAltairSub: '牛郎星',
    guideAltairDesc: '河鼓二（牛郎星）是天鷹座的主星，也是夏季大三角的其中一角。它自轉速度非常快！',
    guideAltairFind: '在夏季大三角中，位於織女星對面，兩旁各有一顆暗星伴隨的就是牛郎星。',
    guideAltairObserve: '一顆明亮的白色恆星。',
    guideAltairFact: '它自轉極快，赤道部分的轉速達到每小時90萬公里，導致它變成了一個扁扁的橢球體。',

    // Antares
    guideAntares: '心宿二 (Antares)',
    guideAntaresSub: '火星的對手',
    guideAntaresDesc: '心宿二是一顆紅超巨星，代表天蠍座的心臟。它的名字意為「阿瑞斯（火星）的對手」，因為它們顏色很像。',
    guideAntaresFind: '在夏季南方的天空中，尋找一顆紅色的亮星。如果你看到像鉤子一樣的星星排列，那就是天蠍座。',
    guideAntaresObserve: '明顯的紅色。當它和火星靠得很近時，可以比較一下它們的顏色。',
    guideAntaresFact: '它非常巨大，如果放在太陽系中心，它的表面會吞沒火星軌道！',

    // Andromeda Galaxy
    guideAndromedaGalaxy: '仙女座大星系 (Andromeda)',
    guideAndromedaGalaxySub: '我們的鄰居',
    guideAndromedaGalaxyDesc: '仙女座大星系是距離我們最近的巨大螺旋星系。它是肉眼能看到最遠的物體（距離250萬光年）。',
    guideAndromedaGalaxyFind: '先找到仙女座，在奎宿九（Mirach）上方尋找一團模糊的光斑。秋季觀測最佳。',
    guideAndromedaGalaxyObserve: '肉眼看像一團模糊的棉花球。雙筒望遠鏡可以看見橢圓的光暈。',
    guideAndromedaGalaxyFact: '它正以每秒110公里的速度衝向我們！預計45億年後會和我們的銀河系主要發生碰撞。',

    // New Content
    blackHoleContext: '黑洞的引力超級強，連光都跑不掉！它就像宇宙原本的一個超大吸塵器。',
    meteorContext: '流星其實是太空中的小石頭，撞到地球空氣燃燒發光，看起來就像畫過天空的線！',
    cometContext: '彗星是來自深空的髒雪球。當它靠近太陽時，冰會融化，變出一條漂亮的尾巴。',
    galaxyContext: '我們住在銀河系。它就像一個巨大的旋轉城市，裡面住了無數的星星、氣體和塵埃。',
    nebulaContext: '星雲是氣體和灰塵組成的雲。它是星星寶寶出生的地方喔！',
    eclipseContext: '當月亮剛好跑到太陽和地球中間，擋住了陽光，就會發生日食，就像手影遊戲一樣！',
    constellationContext: '很久以前，人們把天上的星星連起來，畫成英雄和動物的樣子，這就是星座。',

    // Solar System
    // sun: '太陽', // Already defined above
    mercury: '水星',
    venus: '金星',
    earth: '地球',
    mars: '火星',
    jupiter: '木星',
    saturn: '土星',
    uranus: '天王星',
    neptune: '海王星',
    planetFactSolar: '有趣小知識',
    sunFact: '太陽其實是一顆星星！它是我們太陽系的老大，佔了99.8%的質量喔。',
    mercuryFact: '水星是最小的行星，而且跑得最快，繞太陽一圈只要88天！',
    venusFact: '金星是最熱的行星，比水星還熱！因為它有厚厚的雲層蓋著。',
    earthFact: '我們的家！目前宇宙中唯一知道有生命的地方。要好好愛護它喔！',
    marsFact: '火星也叫紅色星球。科學家派了好多機器人去那裡探險！',
    jupiterFact: '木星是最大的行星！它大到可以塞進1300個地球。',
    saturnFact: '土星有最漂亮的呼啦圈（光環），是由冰塊和石頭組成的。',
    uranusFact: '天王星是躺著轉的！它是最冷的行星之一。',
    neptuneFact: '海王星離太陽最遠，那裡的風超級大，是音速的5倍！',
    // Quiz
    quizTitle: '太空學員訓練',
    quizIntro: '準備好成為一位太空探險家了嗎？回答問題來升級！',
    quizStart: '開始任務',
    quizNext: '下一題',
    quizRetry: '再玩一次',
    quizScore: '得分',
    quizRank: '軍階',
    quizCorrect: '答對了！太棒了！🎉',
    quizWrong: '哎呀！再接再厲！💪',
    quizComplete: '訓練完成！',
    
    // Ranks
    rank1: '太空菜鳥 (Space Rookie)',
    rank2: '星際探險家 (Star Explorer)',
    rank3: '火箭隊長 (Rocket Captain)',
    rank4: '銀河守護者 (Galactic Guardian)',
    rank5: '宇宙大師 (Universe Master)',

    // Questions
    q1: '哪顆星星是夜空中最亮的？',
    q1a: ['天狼星', '織女星', '北極星'],
    q2: '距離太陽最近的行星是哪一顆？',
    q2a: ['金星', '火星', '水星'],
    q3: '月亮變圓的時候，我們叫它什麼？',
    q3a: ['新月', '滿月', '上弦月'],
    q4: '太陽系最大的行星是誰？',
    q4a: ['地球', '木星', '土星'],
    q5: '我們居住的星系叫什麼名字？',
    q5a: ['仙女座星系', '銀河系', '黑眼星系'],
    q6: '什麼顏色的星星溫度最高？',
    q6a: ['紅色', '黃色', '藍色'],
    q7: '地球有多少顆天然衛星（月亮）？',
    q7a: ['1顆', '2顆', '0顆'],
    q8: '被稱為「紅色星球」的是哪一顆？',
    q8a: ['火星', '金星', '木星'],
    q9: '太陽主要是由什麼氣體組成的？',
    q9a: ['氧氣', '氫氣和氦氣', '二氧化碳'],
    q10: '誰有美麗的行星光環（呼啦圈）？',
    q10a: ['土星', '火星', '水星'],
    q11: '流星其實是什麼？',
    q11a: ['掉下來的星星', '燃燒的太空石頭', '外星人的飛船'],
    q12: '什麼東西連光都逃不掉？',
    q12a: ['太陽', '黑洞', '月亮'],
    q13: '我們看星星的時候，其實是在看？',
    q13a: ['過去的樣子', '未來的樣子', '現在的樣子'],
    q14: '北極星可以幫我們找到哪個方向？',
    q14a: ['南方', '北方', '東方'],
    q15: '人類第一次登陸月球是在哪一年？',
    q15a: ['1969年', '2000年', '1800年'],

    // Explanations
    q1_explain: '沒錯！天狼星是除了太陽以外，我們能看到最亮的恆星。它其實是兩顆星星在一起喔！',
    q2_explain: '答對了！水星離太陽最近，所以它白天超級熱，但因為沒有大氣層保溫，晚上又超級冷！',
    q3_explain: '正確！當我們看到圓圓的月亮時，那就是滿月。這是因為太陽光直接照亮了月亮的正面。',
    q4_explain: '太棒了！木星是太陽系裡的大巨人，比所有其他行星加起來還要大兩倍以上！',
    q5_explain: '沒錯！我們住在銀河系，它看起來像一條流過夜空的銀色河流。',
    q6_explain: '答對了！藍色的星星燃燒得最劇烈，溫度最高。紅色的星星反而比較冷喔。',
    q7_explain: '正確！地球只有一顆天然衛星，就是我們的月亮。',
    q8_explain: '沒錯！火星表面有很多氧化鐵（就像生鏽一樣），所以看起來紅紅的。',
    q9_explain: '答對了！太陽是個巨大的氣體球，主要由氫氣和氦氣組成，不停地進行核融合反應發光發熱。',
    q10_explain: '正確！土星環非常壯觀，主要由冰塊、石頭和灰塵組成。',
    q11_explain: '沒錯！流星是太空中的小石頭掉進大氣層時，摩擦燃燒產生的光芒。',
    q12_explain: '答對了！黑洞的引力非常強大，連速度最快的光都被吸進去，所以我們看不見它。',
    q13_explain: '正確！星星離我們很遠，光走過來需要時間。所以我們看到的是它們過去的樣子！',
    q14_explain: '沒錯！北極星幾乎就在地球北極的正上方，所以它能幫我們指引北方。',
    q15_explain: '太棒了！1969年，阿姆斯壯成為第一個踏上月球的人類。他說：「這是我的一小步，卻是人類的一大步。」',

    // Moon Phase
    moonPhaseTitle: '拖動滑桿看看月亮怎麼變！',
    moonDay: '農曆初',
    moonReasonNew: '月亮躲在地球和太陽中間，我們看不到它！',
    moonReasonWax: '月亮慢慢跑出來了，像眉毛一樣。',
    moonReasonFull: '月亮跑到地球後面，太陽光把它的臉照得圓圓的！',
    moonReasonWan: '月亮慢慢變小了，要回家睡覺了。',
    // Star Color
    starColorTitleWhy: '為什麼星星有不同顏色？',
    starColorTitle: '星星顏色與溫度',
    tempLow: '低溫 (約 3,000°C)',
    tempMid: '中溫 (約 6,000°C)',
    tempHigh: '高溫 (約 25,000°C+)',
    starRed: '紅巨星',
    starYellow: '像太陽一樣',
    starBlue: '藍巨星',
    starColorDesc: '你看！雖然紅色水龍頭代表熱水，但在宇宙中，紅色的星星其實是最冷的！藍色的星星才是最熱的喔！',
    scalePlanet: '星球',
    btnCamera: '太空明信片',
    postcard: {
       title: '太空明信片',
       loading: '正在拍照...',
       addSticker: '貼紙',
       addText: '寫字',
       save: '儲存',
       close: '關閉',
       placeholder: '你好，太空！',
       saved: '已儲存！'
    },
    scavenger: {
        mission: '任務',
        find: '尋找',
        foundIt: '發現目標！',
        foundMsg: '你找到了',
        nextTarget: '下一個目標',
        complete: '任務完成！',
        keepSteady: '保持穩定...',
        lookAround: '拖動星圖或轉動手機來搜尋',
        startTitle: '星際尋寶獵人',
        startDesc: '準備好了嗎？讓我們來找出隱藏在星空中的寶藏！',
        startBtn: '開始任務'
    },
    
    // TELESCOPE MANUAL CONTENT (ZH)
    manual: {
      title: 'EYES TO NEW HORIZONS',
      subtitle: '神奇望遠鏡：觀星手冊與使用指南',
      intro: '探索夜空指南',
      features: '特色功能',
      featuresDesc: '探索宇宙的奧秘，學習如何尋找星星、星座、行星和月球特徵。',
      specs: '60倍放大 | HD 鍍膜鏡片 | 簡易組裝',
      kidrise: 'Kidrise',
      
      componentsTitle: '望遠鏡組件',
      caution: '警告：切勿透過望遠鏡直接觀測太陽，以免對眼睛造成永久傷害。',
      parts: {
        eyepieceLock: '目鏡鎖',
        objectiveLens: '物鏡',
        lensHood: '遮光罩',
        mainMirror: '主鏡筒',
        rotaryLock: '旋轉鎖',
        hoop: '鏡箍',
        finder: '尋星鏡',
        eyepiece: '目鏡',
        zenithMirror: '天頂鏡',
        focusAdjustor: '調焦輪',
        tripod: '三腳架',
        liftLock: '升降鎖',
        footTubeLock: '腳管鎖扣',
        plateBuckle: '托盤扣',
        horseshoeFoot: '馬蹄腳'
      },
      
      assemblyTitle: '望遠鏡組裝',
      assemblySteps: {
        1: '1. 底座旋轉鎖鈕',
        2: '2. 目鏡安裝',
        3: '3. 主鏡筒安裝',
        4: '4. 鏡箍固定',
        5: '5. 尋星鏡安裝'
      },
      
      nightSkyTitle: '夜空',
      nightSkyDesc: '在晴朗的夜晚，你可以看到成千上萬顆星星。但你所見的只是浩瀚宇宙的一小部分。除了星星，太空中還有行星、衛星、氣體雲和巨大的虛空。',
      measuringSpaceTitle: '測量宇宙',
      measuringSpaceDesc: '宇宙中的距離大得難以想像。科學家使用「光年」來測量。一光年約為 9.46 萬億公里，即光在一年內行進的距離。',
      
      brightStarsTitle: '明亮的星星',
      brightStarsDesc: '星星看起來像夜空中的小亮點，其實它們是巨大的高溫氣體球。它們看起來很小是因為距離非常遙遠。太陽是離我們最近的恆星。',
      pleiadesDesc: '這是一個被稱為「昴宿星團」(七姊妹星團) 的星群，包含約 500 顆星星。在晴朗的夜晚，肉眼可見其中最亮的七顆。',
      
      galaxiesTitle: '星系',
      galaxiesDesc: '星星聚集在巨大的群體中，稱為「星系」，每個星系由數十億顆星星組成。用強力望遠鏡可以看到許多星系。',
      
      planetsMoonsTitle: '行星與衛星',
      planetsMoonsDesc: '行星是繞恆星運行的大塊岩石或氣體球。地球是繞太陽運行的行星之一。衛星是繞行星運行的岩石或冰球。地球只有一顆衛星——月球。木星則至少有 61 顆衛星！',
      
      solarSystemTitle: '我們的太陽系',
      solarSystemDesc: '太陽、行星及其衛星，以及所有繞太陽運行的物體統稱為「太陽系」。太陽的引力將所有物體保持在軌道上。',
      
      changingSkyTitle: '變幻的星空',
      changingSkyDesc: '我們在天空中看到雖然看似不變，其實一直在變化。星星在夜晚的位置會改變，不同季節也會看到不同的星星。這都是因為地球的運動。',
      spinningEarthTitle: '旋轉的地球',
      spinningEarthDesc: '地球每 24 小時自轉一圈。這讓我們覺得太陽和星星在繞著我們轉，但其實是我們在轉動！',
      
      whereOnEarthTitle: '身在何處？',
      whereOnEarthDesc: '你能看到的星星取決於你在地球上的位置（北半球或南半球）。例如，北斗七星在北半球可見，但在南半球不可見；南十字座則相反。',
      
      usingTelescopeTitle: '使用望遠鏡',
      telescopeTypesDesc: '望遠鏡主要分為兩類：折射式 (Refractor) 和反射式 (Reflector)。本望遠鏡為折射式。',
      refractorDesc: '折射式望遠鏡使用透鏡。光線從物鏡進入，透過目鏡放大。',
      reflectorDesc: '反射式望遠鏡使用鏡子收集光線。',
      
      powerTitle: '倍率與目鏡',
      powerDesc: '放大倍率 (Power) 取決於目鏡。例如 60X 代表放大 60 倍。焦距越短的目鏡，放大倍率越大。',
      
      observingTitle: '觀測指南',
      observingSteps: {
        1: '1. 先用低倍率目鏡，視野較廣，較容易找到目標。',
        2: '2. 使用尋星鏡 (Finder) 將目標對準十字中心。',
        3: '3. 從主目鏡觀看，並慢慢轉動調焦輪，直到影像清晰。'
      },
      
      moonTitle: '月球觀測',
      moonDesc: '月球是夜空中第二亮的天體。你可以看到撞擊坑 (Craters)、月海 (Maria) 和山脈 (Mountains)。',
      moonPhases: '月相變化：新月、盈凸月、滿月、虧凸月、殘月等，是因為我們看到的受光面不同。',
      
      eclipseTitle: '日食與月食',
      eclipseDesc: '當地球、月球和太陽連成一線時會發生食。日食是月球擋住太陽；月食是地球擋住射向月球的陽光。',
      
      careTitle: '保養與維護',
      careDesc: '請將望遠鏡存放在無塵乾燥處。清潔鏡片時請使用專用拭鏡布，切勿使用粗糙布料。',
      
      footer: 'Kidrise STEM Educational Toys (HK) | www.stemtoy.com.hk'
    },
    // How to Use Guide
    howToUse: {
        title: '使用方法',
        step1Title: '1. 對齊時間',
        step1Desc: '轉動底盤（黑色星空部分）使「觀測日期」和外盤的「觀察時間」對齊。',
        step2Title: '2. 尋找方向',
        step2Desc: '橢圓窗口內所示的便是香港此刻可以看到的星座。拿着旋轉星圖，按下述方式對照夜空：',
        step3Title: '3. 觀測技巧',
        step3Desc: '觀看西方夜空時，將盤上的「西」字向下；觀看北方時，將「北」字向下。',
        note: '在 App 中，你可以：\n1. 改變時間：拖動黑色星盤、日期環，或直接在背景黑色區域滑動。\n2. 移動星圖：按住最外層的外框拖動。\n3. 放大縮小：使用滑鼠滾輪 (桌面版) 或雙指開合 (手機版)。'
    },
    mapStyleInfo: {
        western: '國際 (IAU)：顯示國際天文學聯合會定義的 88 個現代星座，包含 4 等以上的恆星。',
        chinese: '中國：顯示中國古代星官系統 (三垣二十八宿)。',
        urban: '市區：僅顯示在光害嚴重的城市夜空中較易看見的亮星與主要星座連線。'
    }
  },
  'en': {
    appTitle: 'Kidrise Sky Explorer',
    subtitle: 'Real-time Star Chart for Young Astronomers',
    visitShop: 'Visit Shop',
    locationTitle: 'Location',
    myGps: 'My GPS',
    hkDef: 'HK (Def)',
    viewingFrom: 'Viewing from:',
    gpsLocation: 'GPS Location',
    hongKong: 'Hong Kong',
    timeTravel: 'Time Travel',
    now: 'NOW',
    viewMode: 'View Mode',
    wideSky: 'Wide (Sky)',
    globe3d: 'Globe (3D)',
    chatPlaceholder: 'Ask about stars...',
    chatThinking: 'Thinking...',
    chatError: 'Signal lost! Try again.',
    chatTitle: 'Star Guide',
    chatSubtitle: 'Powered by Gemini AI',
    tutorial: {
      welcomeTitle: 'Welcome to Kidrise Explorer!',
      welcomeDesc: 'I am your AI Co-pilot. Ready to explore the universe together?',
      
      step1Title: 'Look Around',
      step1Desc: 'Drag to fly! Pinch to zoom. ★ Tap on any star to LOCK onto it and see its secrets!',
      
      step2Title: 'Mission Dock',
      step2Desc: 'This is your main dashboard. Switch between Star Map, Planner, Learn, and Quiz modes.',
      
      step3Title: 'Super Tools',
      step3Desc: 'Can\'t find a star? Tap the "Compass" button and point your phone at the sky. The map will move with you!',
      
      step4Title: 'Ready to Launch!',
      step4Desc: 'That\'s it! Now, let\'s blast off into the infinity of space!',

      nextBtn: 'Next',
      prevBtn: 'Back',
      startBtn: 'Let\'s Go!'
    },
    rendering: 'Rendering',
    askMe: "Hi! I'm your Kidrise Star Guide. Ask me anything about the stars you see! 🌟",
    lat: 'Lat',
    lon: 'Lon',
    // New buttons
    btnUpdateLoc: 'Update Location',
    btnGyro: 'Enable Gyro',
    btnGyroOff: 'Disable Gyro',
    btnArt: 'Show Art',
    // Directions
    dirN: 'N',
    dirS: 'S',
    dirE: 'E',
    dirW: 'W',
    gyroNotSupported: 'Gyroscope not supported or permission denied.',
    locUpdated: 'Location Updated!',
    sun: 'Sun',
    moon: 'Moon',
    // Menu
    menuMap: 'Star Map',
    scalePlanet: 'Planets',
    btnCamera: 'Postcard',

    postcard: {
       title: 'Space Postcard',
       loading: 'Capturing...',
       addSticker: 'Stickers',
       addText: 'Text',
       save: 'Save',
       close: 'Close',
       placeholder: 'Hello Space!',
       saved: 'Saved!'
    },

    scavenger: {
        mission: 'Mission',
        find: 'Find',
        foundIt: 'Found it!',
        foundMsg: 'You found',
        nextTarget: 'Next Target',
        complete: 'Mission Complete!',
        keepSteady: 'Hold steady...',
        lookAround: 'Drag map or rotate phone to search',
        startTitle: 'Star Scavenger Hunt',
        startDesc: 'Ready? Let\'s find hidden treasures in the sky!',
        startBtn: 'Start Mission'
    },
    menuPlanner: 'Planner',
    menuCompass: 'Compass',
    menuLearn: 'Learn',
    menuQuiz: 'Quiz',
    menuGuide: 'Guide', // New Guide Tab

    // Planner
    plannerTitle: 'Stargazing Planner (HKO Live)',
    weatherCurrent: 'Real-time Regional Weather',
    weather9Day: '9-Day Forecast',
    stargazingIndex: 'Stargazing Index',
    conditionGood: 'Good',
    conditionFair: 'Fair',
    conditionPoor: 'Poor',
    cloud: 'Cloud',
    rain: 'Rain',
    temp: 'Temp',
    humidity: 'Humid',
    // Status Logic
    statusClear: 'Clear Skies',
    statusCloudy: 'Cloudy',
    statusRain: 'Rain/Storm',
    statusStable: 'Stable',
    reasonCloud: 'Clouds may obstruct view',
    reasonRain: 'Bad weather conditions',
    reasonMoon: 'Moon is too bright',
    reasonGood: 'Great conditions!',
    reasonFair: 'Conditions are okay',
    moonNew: 'New Moon',
    moonWaxCres: 'Waxing Crescent',
    moonFirstQ: 'First Quarter',
    moonWaxGib: 'Waxing Gibbous',
    moonFull: 'Full Moon',
    moonWanGib: 'Waning Gibbous',
    moonLastQ: 'Last Quarter',
    moonWanCres: 'Waning Crescent',
    // Knowledge
    knowSolar: 'Solar System Adventure',
    knowMoon: 'Moon Magic',
    knowStar: 'Secret of Stars',
    knowBlackHole: 'Black Holes',
    knowMeteor: 'Meteor Shower',
    knowComet: 'Comets',
    knowGalaxy: 'Galaxies',
    knowNebula: 'Nebulae',
    knowEclipse: 'Eclipses',
    knowConstellation: 'Constellations',
    
    solarDesc: 'Explore our planetary neighbors!',
    moonDesc: 'Why does the Moon change shape?',
    starDesc: 'Do colors mean temperature?',
    blackHoleDesc: 'The vacuum cleaners of space!',
    meteorDesc: 'Make a wish on a shooting star!',
    cometDesc: 'Icy snowballs with tails.',
    galaxyDesc: 'Our city of stars.',
    nebulaDesc: 'Where stars are born.',
    eclipseDesc: 'Shadows in space.',
    constellationDesc: 'Connect the dots in the sky.',

    // Constellation Game
    conGameLink: 'Connect the stars!',
    conGameComplete: 'Excellent!',
    conUrsaMajor: 'Ursa Major (Big Dipper)',
    conCassiopeia: 'Cassiopeia',
    conOrion: 'Orion',
    nextLevel: 'Next Level',
    restart: 'Restart',

    // Space Scale
    scaleTitle: 'Space Scale',
    enterWeight: 'Enter Your Weight (kg)',
    scaleDesc: 'See how much you would weigh on other planets! Gravity changes everywhere!',
    pluto: 'Pluto',

    // Elaborations
    solarContext: 'Imagine a giant family running around a bonfire. The Sun is the fire, and the planets are the kids running around it!',
    moonContext: 'The Moon is like a ball that gets lit up by a flashlight (The Sun). As it moves around us, we see different parts lit up!',
    starContext: 'Stars are huge balls of fire. Just like a candle flame, the blue part is actually the hottest, and the red part is "cool"!',

    // Star Guide
    // Guide
    btnBack: 'Back',
    lblFind: 'How to Find',
    lblObserve: 'How to Observe',
    planetFact: 'Did You Know?',
    guideIntro: 'Explore famous stars and celestial objects. Tap on a card to learn more.',

    // Polaris
    guidePolaris: 'Polaris',
    guidePolarisSub: 'The North Star',
    guidePolarisDesc: 'Polaris is a very special star because it stays in almost the same spot in the sky while other stars rotate around it. It has been used by sailors for centuries to find North.',
    guidePolarisFind: 'Find the Big Dipper first. Draw a line through the outer two stars of the Dipper\'s bowl, and it points straight to Polaris.',
    guidePolarisObserve: 'It is a medium brightness star. Easy to see with the naked eye even in the city.',
    guidePolarisFact: 'Polaris is actually a triple star system, but the companions are too faint to see without a telescope.',

    // Sirius
    guideSirius: 'Sirius',
    guideSiriusSub: 'The Dog Star',
    guideSiriusDesc: 'Sirius is the brightest star in the night sky. Its name comes from the Greek word "Seirios," meaning "glowing" or "scorcher."',
    guideSiriusFind: 'Look for Orion\'s Belt (three stars in a row). Follow the line of the belt down to the left to find Sirius.',
    guideSiriusObserve: 'Shines very brightly with a blue-white color. It often twinkles with many colors when it is low in the sky.',
    guideSiriusFact: 'The phrase "Dog Days of Summer" refers to Sirius, because the ancients thought its heat added to the sun\'s heat in summer.',

    // Betelgeuse
    guideBetelgeuse: 'Betelgeuse',
    guideBetelgeuseSub: 'The Red Giant',
    guideBetelgeuseDesc: 'Betelgeuse is a massive red supergiant star. If it were placed at the center of our solar system, it would extend past the orbit of Jupiter!',
    guideBetelgeuseFind: 'It is the bright orange-red star at the top left shoulder of the Orion constellation.',
    guideBetelgeuseObserve: 'Distinctly orange-red to the naked eye. It is one of the easiest stars to recognize by color.',
    guideBetelgeuseFact: 'Betelgeuse will essentially explode as a supernova "soon" - which in astronomy means sometime in the next 100,000 years.',

    // Orion Nebula
    guideOrionNebula: 'Orion Nebula',
    guideOrionNebulaSub: 'Star Factory',
    guideOrionNebulaDesc: 'The Orion Nebula is a vast cloud of dust and gas where new stars are being born. It is one of the brightest nebulae visible to the naked eye.',
    guideOrionNebulaFind: 'Look below Orion\'s Belt for the "Sword" of Orion. The nebula is the fuzzy middle "star" of the sword.',
    guideOrionNebulaObserve: 'Looks like a fuzzy star to the naked eye. Binoculars reveal a faint gray mist. A telescope shows its fan shape.',
    guideOrionNebulaFact: 'It is about 24 light-years across. The light we see from it today left during the fall of the Roman Empire.',

    // Pleiades
    guidePleiades: 'Pleiades',
    guidePleiadesSub: 'The Seven Sisters',
    guidePleiadesDesc: 'Discussion of the Pleiades often leads to the question "how many stars can you see?". It is a beautiful open star cluster containing middle-aged, hot B-type stars.',
    guidePleiadesFind: 'Follow the line of Orion\'s belt upwards to the right, past Aldebaran, to find this small cluster of stars.',
    guidePleiadesObserve: 'Looks like a tiny dipper shape. Most people see 6 stars with the naked eye, but binoculars show dozens.',
    guidePleiadesFact: 'In Japan, this star cluster is known as "Subaru" and is the logo of the car manufacturer.',

    // Rigel
    guideRigel: 'Rigel',
    guideRigelSub: 'Blue Supergiant',
    guideRigelDesc: 'Rigel is the brightest star in Orion (brighter than Betelgeuse!). It is a young, hot, blue supergiant star.',
    guideRigelFind: 'It is the bright blue-white star at the bottom right foot of the Hunter (Orion).',
    guideRigelObserve: 'Shines with an intense blue-white light. Contrasts beautifully with orange Betelgeuse.',
    guideRigelFact: 'Rigel is so luminous that if it replaced our Sun, we would be instantly incinerated. It shines tens of thousands of times brighter than the Sun.',

    // Aldebaran
    guideAldebaran: 'Aldebaran',
    guideAldebaranSub: 'The Eye of Taurus',
    guideAldebaranDesc: 'Aldebaran is an orange giant star representing the angry eye of Taurus the Bull. Its name is Arabic for "The Follower" (it follows the Pleiades).',
    guideAldebaranFind: 'Follow the line of Orion\'s Belt up and to the right. The first bright orange star you hit is Aldebaran.',
    guideAldebaranObserve: 'Distinctly orange. It sits in a V-shaped star cluster called the Hyades, though it is not actually part of the cluster.',
    guideAldebaranFact: 'The Pioneer 10 spacecraft is heading towards Aldebaran and will arrive in about two million years.',

    // Arcturus
    guideArcturus: 'Arcturus',
    guideArcturusSub: 'Guardian of the Bear',
    guideArcturusDesc: 'Arcturus is the brightest star in the northern celestial hemisphere (4th brightest overall). It is an orange giant.',
    guideArcturusFind: 'Follow the arc of the Big Dipper\'s handle away from the bowl. "Arc to Arcturus!"',
    guideArcturusObserve: 'It twinkles with a golden-orange hue.',
    guideArcturusFact: 'Arcturus is not a local; it came from a dwarf galaxy that colliding with the Milky Way. It is zooming through our galaxy disk.',

    // Vega
    guideVega: 'Vega',
    guideVegaSub: 'Queen of Summer',
    guideVegaDesc: 'Vega is the brightest star in the Summer Triangle. It glows blue-white and was once our North Star.',
    guideVegaFind: 'Look for the brightest blue-white star near the zenith (overhead) in summer evenings.',
    guideVegaObserve: 'Very bright and blue-white. Astronomers use it as the standard "Zero Magnitude" star.',
    guideVegaFact: 'Due to Earth\'s wobble, Vega will become the North Star again around the year 14,000.',

    // Altair
    guideAltair: 'Altair',
    guideAltairSub: 'The Cowherd Star',
    guideAltairDesc: 'Altair is the head of Aquila the Eagle and one corner of the Summer Triangle. It spins incredibly fast!',
    guideAltairFind: 'In the Summer Triangle, look for the bright star flanked by two fainter stars on either side.',
    guideAltairObserve: 'A bright white star.',
    guideAltairFact: 'It spins so fast at its equator (900,000 km/h) that the star is flattened into an oval shape instead of a sphere.',

    // Antares
    guideAntares: 'Antares',
    guideAntaresSub: 'Rival of Mars',
    guideAntaresDesc: 'Antares is a red supergiant star marking the heart of Scorpius. Its name means "Anti-Ares" (Rival of Mars) because they look so similar.',
    guideAntaresFind: 'Look south in summer for a bright red star. If you see a fish-hook shape of stars, that\'s Scorpius.',
    guideAntaresObserve: 'Distinctly red. Compare its color to Mars when they are close in the sky.',
    guideAntaresFact: 'It is huge. If placed at the center of our solar system, its surface would swallow the orbit of Mars.',

    // Andromeda Galaxy
    guideAndromedaGalaxy: 'Andromeda Galaxy',
    guideAndromedaGalaxySub: 'Our Neighbor',
    guideAndromedaGalaxyDesc: 'The Andromeda Galaxy is the nearest major galaxy to the Milky Way. It is the most distant object visible to the naked eye (2.5 million light-years).',
    guideAndromedaGalaxyFind: 'Find the constellation Andromeda. Look for a fuzzy patch above the star Mirach. Best seen in autumn.',
    guideAndromedaGalaxyObserve: 'Looks like a faint, fuzzy cotton ball to the naked eye. Binoculars reveal an oval glow.',
    guideAndromedaGalaxyFact: 'It is rushing towards us at 110 km/s! It will collide with the Milky Way in about 4.5 billion years.',
    
    // New Content
    blackHoleContext: 'A Black Hole has gravity so strong that nothing, not even light, can escape! It pulls everything in like a giant drain.',
    meteorContext: 'Meteors are small rocks burning up as they hit Earth\'s air. They look like streaks of light!',
    cometContext: 'Comets are dirty snowballs from deep space. When they get close to the Sun, the ice melts and forms a beautiful tail.',
    galaxyContext: 'We live in the Milky Way Galaxy. It\'s a huge city of stars, gas, and dust spinning around together.',
    nebulaContext: 'A Nebula is a cloud of dust and gas. It\'s a nursery where baby stars are born!',
    eclipseContext: 'An Eclipse happens when the Moon gets exactly between the Sun and Earth, blocking the sunlight like a shadow puppet.',
    constellationContext: 'Long ago, people played "connect the dots" with stars to draw pictures of heroes and animals in the sky.',

    // Solar System
    // sun: 'Sun', // Already exists
    mercury: 'Mercury',
    venus: 'Venus',
    earth: 'Earth',
    mars: 'Mars',
    jupiter: 'Jupiter',
    saturn: 'Saturn',
    uranus: 'Uranus',
    neptune: 'Neptune',
    planetFactSolar: 'Fun Fact',
    sunFact: 'The Sun is actually a star! It is the boss of the Solar System.',
    mercuryFact: 'Mercury is the smallest and fastest planet. A year is only 88 days!',
    venusFact: 'Venus is the hottest planet, even hotter than Mercury, due to thick clouds.',
    earthFact: 'Our Home! The only place we know that has life. Let\'s protect it!',
    marsFact: 'Mars is the Red Planet. We have sent many robots there to explore!',
    jupiterFact: 'Jupiter is the King! It is so big, 1300 Earths could fit inside.',
    saturnFact: 'Saturn has the most beautiful rings, made of ice and rocks.',
    uranusFact: 'Uranus spins on its side! It is an "Ice Giant".',
    neptuneFact: 'Neptune is the farthest away. It has super strong winds!',
    // Quiz
    quizTitle: 'Space Cadet Training',
    quizIntro: 'Ready to become a space explorer? Answer correctly to rank up!',
    quizStart: 'Start Mission',
    quizNext: 'Next Question',
    quizRetry: 'Play Again',
    quizScore: 'Score',
    quizRank: 'Rank',
    quizCorrect: 'Correct! Awesome! 🎉',
    quizWrong: 'Oops! Try again! 💪',
    quizComplete: 'Training Complete!',
    
    // Ranks
    rank1: 'Space Rookie',
    rank2: 'Star Explorer',
    rank3: 'Rocket Captain',
    rank4: 'Galactic Guardian',
    rank5: 'Universe Master',

    howToUse: {
        title: 'How to Use',
        step1Title: '1. Align Time',
        step1Desc: 'Turn the Star Dial (Dark Background) to align the observation date with the time on the Holder.',
        step2Title: '2. Find Direction',
        step2Desc: 'The constellations shown in the oval opening reflect those that can be observed in Hong Kong now. Hold the planisphere as described below.',
        step3Title: '3. Observation',
        step3Desc: 'The "W" should point downwards when viewing the western sky. The "N" should point downwards when viewing the northern sky.',
        note: 'Interactive Controls:\n1. Change Time: Drag the black Star Disk, Date Ring, or the background area.\n2. Move Map: Drag the outer frame.\n3. Zoom: Use mouse wheel (Desktop) or pinch gesture (Mobile).'
    },
    mapStyleInfo: {
        western: 'IAU: Shows the 88 modern constellations defined by the IAU, with stars up to magnitude 4.',
        chinese: 'Chinese: Shows the traditional Chinese star asterisms (Three Enclosures and Twenty-Eight Mansions).',
        urban: 'Urban: Shows only the brighter stars and major constellations visible in light-polluted urban skies.'
    },

    // Questions
    q1: 'Which is the brightest star in the night sky?',
    q1a: ['Sirius', 'Vega', 'Polaris'],
    q2: 'Which planet is closest to the Sun?',
    q2a: ['Venus', 'Mars', 'Mercury'],
    q3: 'When the moon is round and bright, it is a...',
    q3a: ['New Moon', 'Full Moon', 'Crescent Moon'],
    q4: 'Which is the largest planet in our solar system?',
    q4a: ['Earth', 'Jupiter', 'Saturn'],
    q5: 'What is the name of our galaxy?',
    q5a: ['Andromeda', 'Milky Way', 'Black Eye'],
    q6: 'Which color star is the hottest?',
    q6a: ['Red', 'Yellow', 'Blue'],
    q7: 'How many moons does Earth have?',
    q7a: ['One', 'Two', 'Zero'],
    q8: 'Which planet is called the "Red Planet"?',
    q8a: ['Mars', 'Venus', 'Jupiter'],
    q9: 'What is the Sun mainly made of?',
    q9a: ['Oxygen', 'Hydrogen & Helium', 'Carbon Dioxide'],
    q10: 'Which planet has beautiful rings?',
    q10a: ['Saturn', 'Mars', 'Mercury'],
    q11: 'What is a shooting star (meteor) actually?',
    q11a: ['A falling star', 'Burning space rock', 'Alien spaceship'],
    q12: 'What has gravity so strong that not even light can escape?',
    q12a: ['Sun', 'Black Hole', 'Moon'],
    q13: 'When we look at stars, we are seeing them as they were...',
    q13a: ['In the past', 'In the future', 'Right now'],
    q14: 'Polaris (North Star) helps us find which direction?',
    q14a: ['South', 'North', 'East'],
    q15: 'In which year did humans first land on the Moon?',
    q15a: ['1969', '2000', '1800'],

    // Explanations
    q1_explain: 'Correct! Sirius is the brightest star we can see (besides the Sun). It\'s actually a binary star system!',
    q2_explain: 'That\'s right! Mercury is closest to the Sun. It gets super hot during the day but super cold at night because it has no atmosphere!',
    q3_explain: 'Correct! When we see a full round moon, that\'s a Full Moon. The sun is lighting up the whole side we can see.',
    q4_explain: 'Awesome! Jupiter is a giant! It\'s more than twice as massive as all the other planets combined.',
    q5_explain: 'Correct! We live in the Milky Way galaxy. It looks like a milky band of light stretching across the sky.',
    q6_explain: 'Right! Blue stars burn the hottest and fastest. Red stars are actually cooler than blue or yellow ones.',
    q7_explain: 'Correct! Earth has only one natural satellite: The Moon.',
    q8_explain: 'That\'s it! Mars is covered in iron oxide (rust/dust), which gives it that reddish-orange color.',
    q9_explain: 'Correct! The Sun is a giant ball of gas, mostly Hydrogen and Helium, burning in a nuclear reaction.',
    q10_explain: 'Right! Saturn\'s rings are famous and beautiful. They are made mostly of ice chunks and rock.',
    q11_explain: 'Correct! A shooting star is actually a small space rock burning up as it hits Earth\'s atmosphere.',
    q12_explain: 'Correct! Black holes have such strong gravity that nothing, not even light, can escape them!',
    q13_explain: 'Right! Because stars are so far away, light takes time to reach us. We are looking back in time!',
    q14_explain: 'Correct! Polaris sits almost directly above the North Pole, so it stays still while other stars circle it.',
    q15_explain: 'Correct! In 1969, Neil Armstrong became the first human to walk on the Moon. "One small step!"',

    // Moon Phase
    moonPhaseTitle: 'Drag the slider to see moon phases!',
    moonDay: 'Day',
    moonReasonNew: 'The Moon is between Earth and Sun. We can\'t see it!',
    moonReasonWax: 'The Moon is waking up, look at that crescent shape.',
    moonReasonFull: 'The Moon is opposite the Sun. Its face is fully lit!',
    moonReasonWan: 'The Moon is shrinking and going back to sleep.',
    // Star Color
    starColorTitleWhy: 'Why do stars have different colors?',
    starColorTitle: 'Star Color & Temp',
    tempLow: 'Cool (3,000°C)',
    tempMid: 'Medium (6,000°C)',
    tempHigh: 'Hot (25,000°C+)',
    starRed: 'Red Giant',
    starYellow: 'Like Sun',
    starBlue: 'Blue Giant',
    starColorDesc: 'Look! Even though red usually means hot on a tap, in space, Red stars are the coolest! Blue stars are actually the hottest!',
    
    // TELESCOPE MANUAL CONTENT (EN)
    manual: {
      title: 'EYES TO NEW HORIZONS',
      subtitle: 'AMAZING TELESCOPE: THE STARGAZER’S HANDBOOK',
      intro: 'A PRELIMINARY GUIDE TO THE NIGHT SKY',
      features: 'FEATURES',
      featuresDesc: 'Discover some of the amazing things. Find practical advice about how to find stars and constellations, planets, features of the Moon and lots more.',
      specs: '60X MAGNIFICATION | HD COATED LENS | EASY ASSEMBLY',
      kidrise: 'Kidrise',
      
      componentsTitle: 'Components of the telescope',
      caution: 'CAUTION: Do not observe the sun directly through the telescope.',
      parts: {
        eyepieceLock: 'Eyepiece Lock',
        objectiveLens: 'Objective Lens',
        lensHood: 'Lens Hood',
        mainMirror: 'Main Mirror',
        rotaryLock: 'Rotary Lock',
        hoop: 'Hoop',
        finder: 'Finder',
        eyepiece: 'Eyepiece',
        zenithMirror: 'Zenith Mirror',
        focusAdjustor: 'Focus Adjustor',
        tripod: 'Tripod',
        liftLock: 'Lift Lock',
        footTubeLock: 'Foot Tube Lock Button',
        plateBuckle: 'Plate Buckle',
        horseshoeFoot: 'Horseshoe Foot'
      },
      
      assemblyTitle: 'Telescope Assembly',
      assemblySteps: {
        1: '1. Base Rotary Lock Knob',
        2: '2. Eyepiece Installation',
        3: '3. Main Mirror Installation',
        4: '4. Hoop Installation',
        5: '5. Finder Installation'
      },
      
      nightSkyTitle: 'Night sky',
      nightSkyDesc: 'On a clear night, you can see thousands of stars in the sky. But what you see is just a tiny part of what’s out in space. As well as stars, there are planets, moons, clouds of gas and huge stretches of empty space.',
      measuringSpaceTitle: 'Measuring space',
      measuringSpaceDesc: 'Distances between most things in space are so huge that it’s difficult to imagine them. Scientists measure space distances in light years. One light year is 9.46 million million km, which is the distance light travels in a year.',
      
      brightStarsTitle: 'Bright stars',
      brightStarsDesc: 'Stars look like tiny bright lights in the night sky. They are huge balls of incredibly hot gas. But they look tiny because they are very, very far away. The Sun is our nearest star.',
      pleiadesDesc: 'This is a group of stars known as the Pleiades. It contains about 500 stars. It’s also known as the Seven Sisters because, on a clear night, you can see the seven brightest stars in the group with the naked eye.',
      
      galaxiesTitle: 'Galaxies',
      galaxiesDesc: 'Stars exist in enormous groups called galaxies, which are made up of billions of stars. You can see many galaxies with a powerful telescope, although some are too far away to see clearly.',
      
      planetsMoonsTitle: 'Planets and moons',
      planetsMoonsDesc: 'Planets are balls of rock or gas that move around, or orbit, a star. Earth is one of nine planets that orbit the Sun. Moons are balls of rock or ice that orbit planets. Earth has just one moon.',
      
      solarSystemTitle: 'Our Solar System',
      solarSystemDesc: 'The Sun, the planets and their moons, and everything else that orbits the Sun, are together known as the Solar System. The Sun keeps everything in orbit around it with a pulling force called gravity.',
      
      changingSkyTitle: 'Changing sky',
      changingSkyDesc: 'What we can see in the sky is constantly changing. For example, the stars seem to change position during the course of a night. These changes are caused by the Earth’s movements.',
      spinningEarthTitle: 'Spinning Earth',
      spinningEarthDesc: 'The Earth spins around once every 24 hours. As it spins, it looks as if the stars, Sun and Moon are moving around it.',
      
      whereOnEarthTitle: 'Where on Earth?',
      whereOnEarthDesc: 'It’s not just the Earth’s movement that affects which stars you can see, but also where you are on Earth. What you can see depends on which hemisphere you are in.',
      
      usingTelescopeTitle: 'Using telescopes',
      telescopeTypesDesc: 'There are two main types of telescopes: refractor and reflector telescopes.',
      refractorDesc: 'Refractor telescopes use lenses. Light enters the objective lens and is magnified by the eyepiece.',
      reflectorDesc: 'Reflector telescopes use mirrors to collect light.',
      
      powerTitle: 'Different powers',
      powerDesc: 'The larger a telescope’s objective lens or primary mirror is, the more powerful the telescope will be. Power is calculated by dividing focal length of objective by focal length of eyepiece.',
      
      observingTitle: 'Using your telescope',
      observingSteps: {
        1: '1. Begin with a low magnification eyepiece to see a wide section of sky.',
        2: '2. Use the finder telescope to line up the object in the center.',
        3: '3. Look through the main eyepiece and adjust the focus knob until clear.'
      },
      
      moonTitle: 'The Moon',
      moonDesc: 'The Moon is the second brightest object in the sky. It is covered with millions of hollows, or craters.',
      moonPhases: 'As the Moon orbits the Earth, we see different amounts of its sunlit side (Phases: New Moon, Crescent, Quarter, Gibbous, Full Moon).',
      
      eclipseTitle: 'Eclipses',
      eclipseDesc: 'Eclipses happen when Earth, Moon and Sun align. Solar eclipses: Moon blocks Sun. Lunar eclipses: Earth shadows Moon.',
      
      careTitle: 'TAKING CARE OF YOUR TELESCOPE',
      careDesc: 'Keep away from dust and moisture. Clean lenses with soft, non-abrasive cloth. Store in box when not in use.',
      
      footer: 'Kidrise STEM Educational Toys (HK) | www.stemtoy.com.hk'
    }
  }
};