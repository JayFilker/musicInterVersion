# NewMyMusic 项目 - 歌词功能实现完整分析

## 一、项目结构概览

```
src/
├── api/
│   └── lyrics.ts                    # 歌词API接口层
├── components/
│   ├── Lyrics/
│   │   ├── index.tsx               # 歌词主组件（核心）
│   │   ├── index.less              # 歌词样式
│   │   └── lyricsSvg.tsx           # 关闭按钮SVG
│   └── Bottom/
│       ├── LyricsButtom/index.tsx  # 歌词模式下的播放控制条
│       ├── RightControlButtons/    # 歌词开关按钮
│       └── Middle/MiddleTwo/       # 播放器中间层
├── pages/Set/SetLyrics/index.tsx   # 歌词配置页面
└── store/store.ts                  # Jotai全局状态管理
```

## 二、歌词数据流

### 2.1 API 层设计 (src/api/lyrics.ts)

**数据源**: Happi.dev API
- 基础URL: https://api.happi.dev/v1
- API密钥: hk267-2qqOUzXjzt4KZ6LgijLjj0Nl3N35550m0b

**两层查询**:
1. 搜索歌曲 → 获取歌词URL
2. 使用URL → 获取完整歌词内容

### 2.2 React Query 集成

```typescript
// 缓存策略: 5分钟
staleTime: 5 * 60 * 1000

// 条件执行: 只在必要时调用
enabled: !!query || !!lyricsUrl
```

## 三、歌词组件核心逻辑

### 3.1 进度同步算法

```
进度百分比 = 当前播放时间(ms) / 总时长(ms)
应高亮行索引 = 向下取整(百分比 × 总歌词行数)
```

关键点:
- 监听 PlayerDemo atom 中的 progress 和 currentTrackDuration
- 仅在索引改变时更新状态（避免频繁渲染）
- 自动滚动到高亮行（scrollIntoView with smooth behavior）

### 3.2 高亮行渲染

```tsx
{lyricsByUrl?.result?.lyrics?.split('\n')
    ?.filter((item: string) => item !== '')
    ?.map((item: string, index: number) => {
        return (
            <div className={`line ${currentLyricIndex === index + 2 ? 'highlight' : ''}`}>
                <span>{item}</span>
            </div>
        )
    })}
```

注意: 索引偏移量为2（因为前面有作曲和作词信息）

## 四、样式实现详解

### 4.1 高亮效果

```less
.line {
    .content {
        transform: scale(0.95);
        span { opacity: 0.28; }
    }
}

.highlight .content {
    transform: scale(1);      // 放大到实际大小
    span { opacity: 0.98; }   // 提高可见度
}
```

过渡效果: cubic-bezier(0.25, 0.46, 0.45, 0.94) - 0.35s

### 4.2 背景模式

| 模式 | 效果 | CSS实现 |
|------|------|--------|
| 'false' | 无背景 | background: none |
| 'true' | 随机渐变 | linear-gradient(to left top, color1, color2) |
| 'blur' | 模糊封面 | backgroundImage + filter: blur(16px) |
| 'dynamic' | 旋转动画 | @keyframes rotate 360deg |

### 4.3 滚动条隐藏

```less
scrollbar-width: none;              // Firefox
::-webkit-scrollbar { display: none; }  // Chrome/Safari
```

## 五、播放器集成方式

### 5.1 组件层级关系

```
Player
  └─ Middle
      └─ MiddleTwo
          ├─ LyricsButtom (当 lyrics=true)
          └─ 普通播放器 (当 lyrics=false)
```

### 5.2 状态开关流程

```
点击歌词按钮 (RightControlButtons)
  ↓ setShowLyrics(true)
ShowLyrics atom 更新
  ↓
App.tsx 条件渲染 <Lyrics />
  ↓
Lyrics 组件挂载执行初始化
  ↓
监听 PlayerDemo 更新 → 同步高亮行
```

## 六、全局状态定义

### 关键 Atoms:

```typescript
// 歌词显示控制
ShowLyrics: atom(false)

// 播放器状态（同步用）
PlayerDemo: atom({
    progress: 0,              // 当前进度(ms)
    currentTrackDuration: 100 // 总时长(ms)
})

// 当前歌曲列表
CurrentSongList: atom<any>({})

// 当前播放索引
CountDemo: atom(0)

// 歌词配置
SetDemo: atom({
    showTranslate: true,      // 显示翻译
    showBackGround: 'true',   // 背景模式
    currentTime: false,       // 显示时间
    songFontSize: '28',       // 字体大小(px)
})
```

## 七、设置面板 (src/pages/Set/SetLyrics/index.tsx)

### 可配置项:

1. **显示歌词翻译** (复选框)
   - 存储位置: setDemo.showTranslate
   - 默认值: true

2. **显示歌词背景** (下拉菜单)
   - 选项: 关闭 | 打开 | 模糊封面 | 动态
   - 存储值: 'false' | 'true' | 'blur' | 'dynamic'

3. **显示当前时间** (复选框)
   - 存储位置: setDemo.currentTime
   - 默认值: false

4. **歌词字体大小** (下拉菜单)
   - 选项: 16px | 22px | 28px(默认) | 36px
   - 存储值: '16' | '22' | '28' | '36'

## 八、数据流完整示例

### 从用户点击到歌词显示:

```
用户点击歌词按钮
  ↓
RightControlButtons.onClick()
  ↓ setShowLyrics(true)
  ↓
Jotai: ShowLyrics 状态从 false 变为 true
  ↓
App.tsx {showLyrics && <Lyrics></Lyrics>} 判断为真
  ↓
Lyrics 组件挂载
  ├─ useAtom(ShowLyrics)              ✓ 读取状态
  ├─ useAtom(CurrentSongList)         ✓ 获取当前歌曲
  ├─ useAtom(PlayerDemo)              ✓ 获取播放进度
  ├─ useAtom(SetDemo)                 ✓ 获取显示设置
  └─ useSearchMusic(歌曲名)           ✓ 搜索歌词信息
      └─ useLyricsByUrl(歌词URL)      ✓ 获取歌词内容
          └─ 返回: { result: { lyrics: "..." } }
              ↓
  setCurrentLyricIndex(0)             ✓ 初始化高亮行
  ↓
useEffect 监听 PlayerDemo 变化
  每当 player.progress 更新:
  ├─ 计算 newIndex = floor(progress/duration * lineCount)
  ├─ setCurrentLyricIndex(newIndex) ← 仅在改变时
  ├─ querySelector('.highlight').scrollIntoView()
  └─ CSS className 切换触发高亮动画
      ↓
  用户看到平滑高亮和滚动效果 ✓
```

## 九、关键代码片段

### 9.1 进度计算函数

```typescript
const progressPercent = player.progress / player.currentTrackDuration
const lyricLines = lyricsByUrl?.result?.lyrics
    ?.split('\n')
    ?.filter((item: string) => item !== '')

const newIndex = Math.min(
    Math.floor(progressPercent * lyricLines.length),
    lyricLines.length - 1,
)
```

### 9.2 自动滚动实现

```typescript
const highlightedElement = document.querySelector('.highlight')
if (highlightedElement) {
    highlightedElement.scrollIntoView({
        behavior: 'smooth',  // 平滑动画效果
        block: 'center',     // 始终居中显示
    })
}
```

### 9.3 背景生成

```typescript
function getRandomGradient() {
    const getRandomColor = () => {
        const r = Math.floor(Math.random() * 200) + 30
        const g = Math.floor(Math.random() * 200) + 30
        const b = Math.floor(Math.random() * 200) + 30
        return `rgb(${r}, ${g}, ${b})`
    }
    const color1 = getRandomColor()
    const color2 = getRandomColor()
    setBackgroundGradient(`linear-gradient(to left top, ${color1}, ${color2})`)
}
```

## 十、特别考虑

### 10.1 性能优化

- React Query 缓存: 5分钟内不重复请求
- 条件查询: enabled 字段防止不必要的API调用
- 状态更新优化: 仅在 currentLyricIndex 改变时更新
- CSS 优化: 使用 transform 和 opacity（GPU加速）

### 10.2 用户体验

- 平滑滚动: scrollIntoView({ behavior: 'smooth' })
- 动画过渡: cubic-bezier 缓动函数，0.35s 时长
- 响应式设计: 超宽屏/竖屏适配
- 字体大小可调: 16px - 36px

### 10.3 错误处理

```typescript
// API 调用失败时显示默认信息
{lyricsByUrl ? (
    // 显示歌词
) : (
    <div>该歌曲暂未提供歌词</div>
)}
```

## 十一、已知问题和解决方案

| 问题 | 原因 | 解决方案 |
|------|------|--------|
| 歌词显示滞后 | 进度更新不及时 | 增加播放器更新频率 |
| 歌词不匹配 | API 搜索结果误差 | 加入艺术家名称过滤 |
| 滚动卡顿 | 大量歌词节点 | 实现虚拟滚动 |
| API 限制 | 调用频率超限 | 使用React Query缓存 |

