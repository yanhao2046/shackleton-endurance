// 人物小传：身份来自书内《帝国穿越南极探险队队员名单》，高光时刻均取自原文。
// rank 1-3 为固定核心三人；其余按着墨/精彩/重要程度排列。
const CA_HISTORY_BASE = "https://www.coolantarctica.com/Antarctica%20fact%20file/History/";
const CA_CREW_PAGE = `${CA_HISTORY_BASE}antarctic_whos_who_endurance.php`;

const CHARACTERS = [
  {
    key: "shackleton",
    name: "沙克尔顿",
    nameEn: "Ernest Shackleton",
    role: "队长（“老板”）",
    rank: 1,
    bio: "帝国横越南极探险队队长，全队都叫他“老板”。弃船减重时，他当众把一只金烟盒和几枚金币扔进脚下的雪里，示范“与能够活着逃出生天相比，任何东西都一文不值”；无论多绝望，都绝不在队员面前流露，最后亲率五人乘“凯尔德号”横渡南大洋去求援。",
    image: {
      src: `${CA_HISTORY_BASE}shackleton_sm.jpg`,
      alt: "Ernest Shackleton",
      caption: "欧内斯特·沙克尔顿，探险队队长",
      sourceUrl: CA_CREW_PAGE
    }
  },
  {
    key: "wild",
    name: "王尔德",
    nameEn: "Frank Wild",
    role: "副队长",
    rank: 2,
    bio: "沙克尔顿的副手，最沉得住气的人。坚忍号将沉时，他只把头探进船员舱，平静地说一句“船就要沉了，伙计们”；他也是猎海豹的“行刑者”，按沃斯利报来的方位一枪爆头。“凯尔德号”走后，他带着 22 人留守大象岛四个多月，每天清早催大家卷好睡袋，仿佛救援船今天就到。",
    image: {
      src: `${CA_HISTORY_BASE}frank-wild-sm.jpg`,
      alt: "Frank Wild",
      caption: "弗兰克·王尔德，副队长",
      sourceUrl: CA_CREW_PAGE
    }
  },
  {
    key: "worsley",
    name: "沃斯利",
    nameEn: "Frank Worsley",
    role: "船长",
    rank: 3,
    bio: "坚忍号船长，导航奇才。在终日颠簸、难得见到太阳的小艇上，他靠偶尔一瞥就测定方位，把“凯尔德号”准确导到 800 多海里外的南乔治亚，又和沙克尔顿、克林一起翻越无人横穿过的南乔治亚雪山。被沙克尔顿当众祝贺导航成功时，冻僵的他反倒不好意思地把目光移开。",
    image: {
      src: `${CA_HISTORY_BASE}frank-worsley-sm.jpg`,
      alt: "Frank Worsley",
      caption: "弗兰克·沃斯利，坚忍号船长",
      sourceUrl: CA_CREW_PAGE
    }
  },
  {
    key: "crean",
    name: "克林",
    nameEn: "Tom Crean",
    role: "二副",
    bio: "久经考验的爱尔兰老水手。沙克尔顿评价他“总是让干什么就干什么”，唯一拿不准的，是他“粗鄙又总爱得罪人的脾性”能否熬过漫长的等待。正因为够硬，他被选进“凯尔德号”六人组，并和沙克尔顿、沃斯利一起翻越南乔治亚。",
    image: {
      src: `${CA_HISTORY_BASE}tom-crean-sm.jpg`,
      alt: "Thomas Crean",
      caption: "托马斯·克林，二副",
      sourceUrl: CA_CREW_PAGE
    }
  },
  {
    key: "mcnish",
    name: "麦克奈什",
    nameEn: "Harry McNish",
    role: "木匠",
    bio: "船上的老木匠，一手把普通救生艇“凯尔德号”改装成能远渡重洋的小船（加帆布甲板、垫高船舷）。但在拖船最苦的一段，他突然冲沃斯利发飙“再也不干了”，以“探险船已沉、所签合同就此终止”当起“海上律师”拒绝服从命令，被沙克尔顿搬出合同里的特别条款严厉驳回。",
    image: {
      src: `${CA_HISTORY_BASE}henry-mcnish-sm.jpg`,
      alt: "Henry McNish",
      caption: "亨利·麦克奈什，木匠",
      sourceUrl: CA_CREW_PAGE
    }
  },
  {
    key: "hurley",
    name: "赫尔利",
    nameEn: "Frank Hurley",
    role: "官方摄影师",
    bio: "随队摄影师。坚忍号已经进水时，他挤过半卡死的舱门、蹚着没到脚踝的积水，冲回去抢出装着玻璃底片的箱子——这些“真正的宝藏”，后来成了这趟绝境之旅最著名的影像。",
    image: {
      src: `${CA_HISTORY_BASE}frank--hurley-sm.jpg`,
      alt: "Frank Hurley",
      caption: "弗兰克·赫尔利，官方摄影师",
      sourceUrl: CA_CREW_PAGE
    }
  },
  {
    key: "ordelees",
    name: "奥德-利兹",
    nameEn: "Thomas Orde-Lees",
    role: "仓库保管员",
    bio: "原马达专家，后来管仓库，一个“铜板掰两半用”的人，绰号一大堆（“上校”“老娘们儿”“大肚叫花子”）。最惊险的一次，他滑雪回营时被一头豹海豹一路追猎，吓得连喊救命都成了尖叫，王尔德拎枪赶到才把海豹击毙，下颌骨送他作纪念；又一回他宣称自己多猎了三头海豹，沙克尔顿却嫌存粮够了、下令把海豹弃在原地，惹得众人不满。沙克尔顿“对他深恶痛绝”，他还用第三人称把这事如实记进了日记。",
    image: {
      src: `${CA_HISTORY_BASE}orde-lees-sm.jpg`,
      alt: "Thomas Orde-Lees",
      caption: "托马斯·奥德-利兹，仓库保管员",
      sourceUrl: CA_CREW_PAGE
    }
  },
  {
    key: "hussey",
    name: "赫西",
    nameEn: "Leonard Hussey",
    role: "气象学家",
    bio: "队里的开心果，人人喜欢，绰号“赫西鸟”“赫丝”。最有名的是他那把十二磅重的齐特班卓琴——连弃船减重时，沙克尔顿都特许把它带上救生艇，谁想高歌一曲，他随时乐意抚琴伴奏。",
    image: {
      src: `${CA_HISTORY_BASE}hussey-sm.jpg`,
      alt: "Leonard Hussey",
      caption: "伦纳德·赫西，气象学家",
      sourceUrl: CA_CREW_PAGE
    }
  },
  {
    key: "mccarthy",
    name: "麦卡锡",
    nameEn: "Timothy McCarthy",
    role: "一级船员",
    bio: "“凯尔德号”六人之一。沃斯利说他是“我所见过的最压不垮的乐天派”——风浪滔天、小船都结了厚厚的冰，换班时他还咧嘴一笑、示意沃斯利把脖子缩低点：“今儿天真好，老板。”",
    image: {
      src: `${CA_HISTORY_BASE}tim-mcc-sm.jpg`,
      alt: "Timothy McCarthy",
      caption: "蒂莫西·麦卡锡，一级船员",
      sourceUrl: CA_CREW_PAGE
    }
  },
  {
    key: "blackborow",
    name: "布莱克波罗",
    nameEn: "Perce Blackborow",
    role: "偷渡者（后为乘务员）",
    bio: "18 岁的偷渡者，藏在油布后被偷偷带上船，使实有人数凑成了 28 人。小艇航行中他左脚脚趾冻坏（后来截趾）；也正因为伤得最重，他被安排成第一个登上大象岛的人。",
    image: {
      src: `${CA_HISTORY_BASE}percy-blacbarrow-sm.jpg`,
      alt: "Perce Blackborow",
      caption: "珀西·布莱克波罗，偷渡者",
      sourceUrl: CA_CREW_PAGE
    }
  },
  {
    key: "macklin",
    name: "麦克林",
    nameEn: "Alexander Macklin",
    role: "外科医生",
    bio: "随队大夫，也是全书引用最多的日记者之一。许多绝境中的心理实感都出自他的笔下——从“我的狗明天就要被枪杀了”，到耐心营、大象岛上日复一日的等待与煎熬。",
    image: {
      src: `${CA_HISTORY_BASE}Macklin-sm.jpg`,
      alt: "Alexander Macklin",
      caption: "亚历山大·麦克林，外科医生",
      sourceUrl: CA_CREW_PAGE
    }
  },
  {
    key: "green",
    name: "格林",
    nameEn: "Charles Green",
    role: "厨师",
    bio: "随队厨师（前任酗酒被开，他来补的缺）。说话尖声尖气、做事较真到一根筋，大家当面拿他寻开心、觉得他疯疯傻傻、丢三落四，私底下却最敬重他——别人一天只干三小时，他一大早就钻进厨房忙到深夜。无论被困、弃船还是登岛，他总守着那只海豹油炉：坚忍号被困那夜，连“弱不禁风”的他都先烤好面包、再跑去和大家一起砸冰救船，众人放弃后又给每个人煮好热粥暖身才肯睡。",
    image: {
      src: `${CA_HISTORY_BASE}biography/CharlesGreen.jpg`,
      alt: "Charles Green",
      caption: "查尔斯·格林，厨师",
      sourceUrl: CA_CREW_PAGE
    }
  }
];
