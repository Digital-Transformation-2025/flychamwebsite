import { useEffect } from 'react'

let animationComposerPromise = null
let animationStore = null
let pendingCalls = []

const propToWebMap = {
  motionPath: [
    {
      selector: 'te=>`[data-ph-id="${te}"]`',
      rule: {
        type: 'style',
        key: 'transform',
        fn: '(te,_)=>{const ne=le=>{const de=le.match(/\\w+\\([^)]*\\)/g)||[],pe=(ye="")=>(ye.match(/[-+]?\\d*\\.?\\d+(?:e[-+]?\\d+)?/g)||[]).map(parseFloat),fe=Array.from({length:8},(ye,ve)=>pe(de[ve]));return{xy:(ye,ve,Ae=0)=>fe[ye][ve]??Ae,sc:ye=>fe[3][ye]??fe[3][0]??1}},{xy:ae,sc:se}=ne(te);return`translate(${_.pos[0]}px, ${_.pos[1]}px) rotate(${ae(1,0)}deg) skew(${ae(2,0)}deg, ${ae(2,1)}deg) scale(${se(0)}, ${se(1)}) translate(${ae(4,0)}px, ${ae(4,1)}px) translate(${ae(5,0)}px, ${ae(5,1)}px) translate(${ae(6,0)}px, ${ae(6,1)}px) translate(${ae(7,0)}px, ${ae(7,1)}px)`}'
      }
    }
  ],
  rotation: [
    {
      selector: 'te=>`[data-ph-id="${te}"]`',
      rule: {
        type: 'style',
        key: 'transform',
        fn: '(te,_)=>{const ne=le=>{const de=le.match(/\\w+\\([^)]*\\)/g)||[],pe=(ye="")=>(ye.match(/[-+]?\\d*\\.?\\d+(?:e[-+]?\\d+)?/g)||[]).map(parseFloat),fe=Array.from({length:8},(ye,ve)=>pe(de[ve]));return{xy:(ye,ve,Ae=0)=>fe[ye][ve]??Ae,sc:ye=>fe[3][ye]??fe[3][0]??1}},{xy:ae,sc:se}=ne(te);return`translate(${ae(0,0)}px, ${ae(0,1)}px) rotate(${_*180/Math.PI}deg) skew(${ae(2,0)}deg, ${ae(2,1)}deg) scale(${se(0)}, ${se(1)}) translate(${ae(4,0)}px, ${ae(4,1)}px) translate(${ae(5,0)}px, ${ae(5,1)}px) translate(${ae(6,0)}px, ${ae(6,1)}px) translate(${ae(7,0)}px, ${ae(7,1)}px)`}'
      }
    }
  ],
  scaleX: [
    {
      selector: 'te=>`[data-ph-id="${te}"]`',
      rule: {
        type: 'style',
        key: 'transform',
        fn: '(te,_)=>{const ne=le=>{const de=le.match(/\\w+\\([^)]*\\)/g)||[],pe=(ye="")=>(ye.match(/[-+]?\\d*\\.?\\d+(?:e[-+]?\\d+)?/g)||[]).map(parseFloat),fe=Array.from({length:8},(ye,ve)=>pe(de[ve]));return{xy:(ye,ve,Ae=0)=>fe[ye][ve]??Ae,sc:ye=>fe[3][ye]??fe[3][0]??1}},{xy:ae,sc:se}=ne(te);return`translate(${ae(0,0)}px, ${ae(0,1)}px) rotate(${ae(1,0)}deg) skew(${ae(2,0)}deg, ${ae(2,1)}deg) scale(${_}, ${se(1)}) translate(${ae(4,0)}px, ${ae(4,1)}px) translate(${ae(5,0)}px, ${ae(5,1)}px) translate(${ae(6,0)}px, ${ae(6,1)}px) translate(${ae(7,0)}px, ${ae(7,1)}px)`}'
      }
    }
  ],
  scaleY: [
    {
      selector: 'te=>`[data-ph-id="${te}"]`',
      rule: {
        type: 'style',
        key: 'transform',
        fn: '(te,_)=>{const ne=le=>{const de=le.match(/\\w+\\([^)]*\\)/g)||[],pe=(ye="")=>(ye.match(/[-+]?\\d*\\.?\\d+(?:e[-+]?\\d+)?/g)||[]).map(parseFloat),fe=Array.from({length:8},(ye,ve)=>pe(de[ve]));return{xy:(ye,ve,Ae=0)=>fe[ye][ve]??Ae,sc:ye=>fe[3][ye]??fe[3][0]??1}},{xy:ae,sc:se}=ne(te);return`translate(${ae(0,0)}px, ${ae(0,1)}px) rotate(${ae(1,0)}deg) skew(${ae(2,0)}deg, ${ae(2,1)}deg) scale(${se(0)}, ${_}) translate(${ae(4,0)}px, ${ae(4,1)}px) translate(${ae(5,0)}px, ${ae(5,1)}px) translate(${ae(6,0)}px, ${ae(6,1)}px) translate(${ae(7,0)}px, ${ae(7,1)}px)`}'
      }
    }
  ],
  skewX: [
    {
      selector: 'te=>`[data-ph-id="${te}"]`',
      rule: {
        type: 'style',
        key: 'transform',
        fn: '(te,_)=>{const ne=le=>{const de=le.match(/\\w+\\([^)]*\\)/g)||[],pe=(ye="")=>(ye.match(/[-+]?\\d*\\.?\\d+(?:e[-+]?\\d+)?/g)||[]).map(parseFloat),fe=Array.from({length:8},(ye,ve)=>pe(de[ve]));return{xy:(ye,ve,Ae=0)=>fe[ye][ve]??Ae,sc:ye=>fe[3][ye]??fe[3][0]??1}},{xy:ae,sc:se}=ne(te);return`translate(${ae(0,0)}px, ${ae(0,1)}px) rotate(${ae(1,0)}deg) skew(${_*180/Math.PI}deg, ${ae(2,1)}deg) scale(${se(0)}, ${se(1)}) translate(${ae(4,0)}px, ${ae(4,1)}px) translate(${ae(5,0)}px, ${ae(5,1)}px) translate(${ae(6,0)}px, ${ae(6,1)}px) translate(${ae(7,0)}px, ${ae(7,1)}px)`}'
      }
    }
  ],
  skewY: [
    {
      selector: 'te=>`[data-ph-id="${te}"]`',
      rule: {
        type: 'style',
        key: 'transform',
        fn: '(te,_)=>{const ne=le=>{const de=le.match(/\\w+\\([^)]*\\)/g)||[],pe=(ye="")=>(ye.match(/[-+]?\\d*\\.?\\d+(?:e[-+]?\\d+)?/g)||[]).map(parseFloat),fe=Array.from({length:8},(ye,ve)=>pe(de[ve]));return{xy:(ye,ve,Ae=0)=>fe[ye][ve]??Ae,sc:ye=>fe[3][ye]??fe[3][0]??1}},{xy:ae,sc:se}=ne(te);return`translate(${ae(0,0)}px, ${ae(0,1)}px) rotate(${ae(1,0)}deg) skew(${ae(2,0)}deg, ${_*180/Math.PI}deg) scale(${se(0)}, ${se(1)}) translate(${ae(4,0)}px, ${ae(4,1)}px) translate(${ae(5,0)}px, ${ae(5,1)}px) translate(${ae(6,0)}px, ${ae(6,1)}px) translate(${ae(7,0)}px, ${ae(7,1)}px)`}'
      }
    }
  ],
  contentAnchor: [
    {
      selector: 'te=>`[data-ph-id="${te}"]`',
      rule: {
        type: 'style',
        key: 'transform',
        fn: '(te,_)=>{const ne=le=>{const de=le.match(/\\w+\\([^)]*\\)/g)||[],pe=(ye="")=>(ye.match(/[-+]?\\d*\\.?\\d+(?:e[-+]?\\d+)?/g)||[]).map(parseFloat),fe=Array.from({length:8},(ye,ve)=>pe(de[ve]));return{xy:(ye,ve,Ae=0)=>fe[ye][ve]??Ae,sc:ye=>fe[3][ye]??fe[3][0]??1}},{xy:ae,sc:se}=ne(te);return`translate(${ae(0,0)}px, ${ae(0,1)}px) rotate(${ae(1,0)}deg) skew(${ae(2,0)}deg, ${ae(2,1)}deg) scale(${se(0)}, ${se(1)}) translate(${-_.contentAnchorX}px, ${-_.contentAnchorY}px) translate(${ae(5,0)}px, ${ae(5,1)}px) translate(${ae(6,0)}px, ${ae(6,1)}px) translate(${ae(7,0)}px, ${ae(7,1)}px)`}'
      }
    }
  ],
  width: [
    {
      selector: 'te=>`[data-ph-geometry-id="${te}"]`',
      svg: { type: 'style', key: 'width', fn: '(te="0px",_)=>`${_}${(te.match(/[a-z%]+$/i)||["px"])[0]}`' }
    },
    {
      selector: 'te=>`[data-ph-id="${te}"]`',
      dom: { type: 'style', key: 'width', fn: '(te="0px",_)=>`${_}${(te.match(/[a-z%]+$/i)||["px"])[0]}`' }
    },
    {
      selector: 'te=>`[data-ph-id="${te}"]`',
      rule: {
        type: 'style',
        key: 'transform',
        fn: '(te,_)=>{const ne=le=>{const de=le.match(/\\w+\\([^)]*\\)/g)||[],pe=(ye="")=>(ye.match(/[-+]?\\d*\\.?\\d+(?:e[-+]?\\d+)?/g)||[]).map(parseFloat),fe=Array.from({length:8},(ye,ve)=>pe(de[ve]));return{xy:(ye,ve,Ae=0)=>fe[ye][ve]??Ae,sc:ye=>fe[3][ye]??fe[3][0]??1}},{xy:ae,sc:se}=ne(te);return`translate(${ae(0,0)}px, ${ae(0,1)}px) rotate(${ae(1,0)}deg) skew(${ae(2,0)}deg, ${ae(2,1)}deg) scale(${se(0)}, ${se(1)}) translate(${ae(4,0)}px, ${ae(4,1)}px) translate(${ae(6,0)*_}px, ${ae(5,1)}px) translate(${ae(6,0)}px, ${ae(6,1)}px) translate(${ae(7,0)}px, ${ae(7,1)}px)`}'
      }
    }
  ],
  height: [
    {
      selector: 'te=>`[data-ph-geometry-id="${te}"]`',
      svg: { type: 'style', key: 'height', fn: '(te="0px",_)=>`${_}${(te.match(/[a-z%]+$/i)||["px"])[0]}`' }
    },
    {
      selector: 'te=>`[data-ph-id="${te}"]`',
      dom: { type: 'style', key: 'height', fn: '(te="0px",_)=>`${_}${(te.match(/[a-z%]+$/i)||["px"])[0]}`' }
    },
    {
      selector: 'te=>`[data-ph-id="${te}"]`',
      rule: {
        type: 'style',
        key: 'transform',
        fn: '(te,_)=>{const ne=le=>{const de=le.match(/\\w+\\([^)]*\\)/g)||[],pe=(ye="")=>(ye.match(/[-+]?\\d*\\.?\\d+(?:e[-+]?\\d+)?/g)||[]).map(parseFloat),fe=Array.from({length:8},(ye,ve)=>pe(de[ve]));return{xy:(ye,ve,Ae=0)=>fe[ye][ve]??Ae,sc:ye=>fe[3][ye]??fe[3][0]??1}},{xy:ae,sc:se}=ne(te);return`translate(${ae(0,0)}px, ${ae(0,1)}px) rotate(${ae(1,0)}deg) skew(${ae(2,0)}deg, ${ae(2,1)}deg) scale(${se(0)}, ${se(1)}) translate(${ae(4,0)}px, ${ae(4,1)}px) translate(${ae(5,0)}px, ${ae(6,1)*_}px) translate(${ae(6,0)}px, ${ae(6,1)}px) translate(${ae(7,0)}px, ${ae(7,1)}px)`}'
      }
    }
  ],
  opacity: [
    { selector: 'te=>`[data-ph-id="${te}"]`', rule: { type: 'style', key: 'opacity', fn: '(te="0",_)=>`${_}`' } }
  ],
  blendMode: [],
  cornerRadius: [],
  fontSize: [
    {
      selector: 'te=>`[data-ph-id="${te}"]`',
      rule: { type: 'style', key: 'fontSize', fn: '(te="0px",_)=>`${_}${(te.match(/[a-z%]+$/i)||["px"])[0]}`' }
    }
  ],
  lineHeight: [
    {
      selector: 'te=>`[data-ph-id="${te}"]`',
      rule: { type: 'style', key: 'lineHeight', fn: '(te="0px",_)=>`${_}${(te.match(/[a-z%]+$/i)||["px"])[0]}`' }
    }
  ],
  letterSpacing: [
    {
      selector: 'te=>`[data-ph-id="${te}"]`',
      rule: { type: 'style', key: 'letterSpacing', fn: '(te="0px",_)=>`${_}${(te.match(/[a-z%]+$/i)||["px"])[0]}`' }
    }
  ],
  pathMorphing: [],
  'fills.paint': [
    {
      selector: '(te,_)=>`[data-ph-layer-id="${te}-fills-${_}"]`',
      dom: {
        type: 'style',
        key: 'backgroundColor',
        fn: '(te,_)=>{const ne=(ae,se=1)=>{const le=Math.round(ae[0]*255),de=Math.round(ae[1]*255),pe=Math.round(ae[2]*255);return`rgba(${le}, ${de}, ${pe}, ${se})`};switch(_.type){case 0:return`${ne(_.color,1)}`;case 1:return te;case 2:return te}}'
      },
      domText: {
        type: 'style',
        key: 'color',
        fn: '(te,_)=>{const ne=(ae,se=1)=>{const le=Math.round(ae[0]*255),de=Math.round(ae[1]*255),pe=Math.round(ae[2]*255);return`rgba(${le}, ${de}, ${pe}, ${se})`};switch(_.type){case 0:return`${ne(_.color,1)}`;case 1:return te;case 2:return te}}'
      },
      svg: {
        type: 'style',
        key: 'fill',
        fn: '(te,_)=>{const ne=(ae,se=1)=>{const le=Math.round(ae[0]*255),de=Math.round(ae[1]*255),pe=Math.round(ae[2]*255);return`rgba(${le}, ${de}, ${pe}, ${se})`};switch(_.type){case 0:return`${ne(_.color,1)}`;case 1:return te;case 2:return te}}'
      }
    }
  ],
  'fills.opacity': [
    {
      selector: '(te,_)=>`[data-ph-layer-id="${te}-fills-${_}"]`',
      dom: { type: 'style', key: 'opacity', fn: '(te="0",_)=>`${_}`' },
      svg: { type: 'style', key: 'fillOpacity', fn: '(te="0",_)=>`${_}`' }
    }
  ],
  'strokes.paint': [
    {
      selector: '(te,_)=>`[data-ph-layer-id="${te}-strokes-${_}"]`',
      dom: {
        type: 'style',
        key: 'borderColor',
        fn: '(te,_)=>{const ne=(ae,se=1)=>{const le=Math.round(ae[0]*255),de=Math.round(ae[1]*255),pe=Math.round(ae[2]*255);return`rgba(${le}, ${de}, ${pe}, ${se})`};switch(_.type){case 0:return`${ne(_.color,1)}`;case 1:return console.warn("strokePaintToCSS: not support gradient"),te;case 2:return te}}'
      },
      svg: {
        type: 'style',
        key: 'stroke',
        fn: '(te,_)=>{const ne=(ae,se=1)=>{const le=Math.round(ae[0]*255),de=Math.round(ae[1]*255),pe=Math.round(ae[2]*255);return`rgba(${le}, ${de}, ${pe}, ${se})`};switch(_.type){case 0:return`${ne(_.color,1)}`;case 1:return te;case 2:return te}}'
      }
    }
  ],
  'strokes.opacity': [
    {
      selector: '(te,_)=>`[data-ph-layer-id="${te}-strokes-${_}"]`',
      dom: { type: 'style', key: 'opacity', fn: '(te="0",_)=>`${_}`' },
      svg: { type: 'style', key: 'strokeOpacity', fn: '(te="0",_)=>`${_}`' }
    }
  ],
  'strokes.dash': [],
  'strokes.gap': [],
  'strokes.join': [],
  'strokes.miter': [],
  'strokes.ends': [],
  'strokes.width': [
    {
      selector: '(te,_)=>`[data-ph-layer-id="${te}-fills-${_}"]`',
      dom: { type: 'style', key: 'borderWidth', fn: '(te="0px",_)=>`${_}${(te.match(/[a-z%]+$/i)||["px"])[0]}`' },
      svg: { type: 'style', key: 'strokeWidth', fn: '(te="0px",_)=>`${_}${(te.match(/[a-z%]+$/i)||["px"])[0]}`' }
    },
    {
      selector: '(te,_)=>`[data-ph-layer-id="${te}-fills-${_}"]`',
      dom: { type: 'style', key: 'margin', fn: '(te,_)=>`-${_/2}px`' }
    }
  ],
  'trimPath.start': [],
  'trimPath.end': [],
  'trimPath.offset': []
}
const domTagNames = ['div', 'p']
const domTextTagNames = ['p']
const svgTagNames = ['svg', 'ellipse', 'rect', 'path', 'text', 'use', 'g']

function loadAnimationComposer() {
  if (window.AnimationComposer) return Promise.resolve()

  if (!animationComposerPromise) {
    animationComposerPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://cdn1.phase.com/animation-composer/index5.js'
      script.async = true
      script.onload = () => {
        if (window.AnimationComposer) resolve()
        else reject(new Error('AnimationComposer not found on window'))
      }
      script.onerror = () => reject(new Error('Failed to load AnimationComposer'))
      document.head.appendChild(script)
    })
  }

  return animationComposerPromise
}

function createStore() {
  class AC extends window.AnimationComposer {
    setComputedData(trackKey, value) {
      super.setComputedData(trackKey, value)

      const parsedTrackKey = (trackKey) => {
        const [elementId, ...rest] = trackKey.split('.')
        if (rest.length === 1) return { elementId, key: rest[0], index: null }
        if (rest.length === 2) return { elementId, key: `${rest[0]}.${rest[1]}`, index: null }
        if (rest.length === 3) return { elementId, key: `${rest[0]}.${rest[2]}`, index: rest[1] }
      }
      const { elementId, key, index } = parsedTrackKey(trackKey)

      const targetInfos = propToWebMap[key]
      if (!targetInfos) return

      for (const info of targetInfos) {
        const selector = eval(info.selector)(elementId, index)
        const element = document.querySelector(selector)
        if (!element) continue

        let theInfo = null
        const tagName = element.tagName.toLowerCase()
        if (domTagNames.includes(tagName)) {
          if (domTextTagNames.includes(tagName)) {
            theInfo = info.domText || info.dom || info.rule
          } else {
            theInfo = info.dom || info.rule
          }
        } else if (svgTagNames.includes(tagName)) {
          theInfo = info.svg || info.rule
        }

        if (!theInfo) continue

        const { key, fn, type } = theInfo
        if (type === 'style') {
          const original = element.style[key]
          const result = eval(fn)(original, value)
          element.style[key] = result
        } else if (type === 'attribute') {
          const original = element.getAttribute(key)
          const result = eval(fn)(original, value)
          element.setAttribute(key, result)
        }
      }
    }
  }

  const composer = new AC()
  composer.start()

  const load = (track) => {
    if (!track?.tracks) return
    const tracks = new Map(Object.entries(track.tracks))
    composer.loadAnimationTrack(track.id, { ...track, tracks })
  }

  const forward = (trackId) => {
    if (trackId) composer.playAnimation(trackId, {})
  }

  const reverse = (trackId) => {
    if (trackId) composer.playAnimation(trackId, { backward: true })
  }

  return { load, forward, reverse }
}

function ensureStoreReady(callback) {
  loadAnimationComposer()
    .then(() => {
      if (!animationStore) {
        animationStore = createStore()
        pendingCalls.forEach((fn) => fn(animationStore))
        pendingCalls = []
      }
      callback(animationStore)
    })
    .catch(console.error)
}

const useAnimation = (timeline) => {
  useEffect(() => {
    if (!timeline) return
    ensureStoreReady((store) => {
      store.load(timeline)
    })
  }, [timeline])

  return {
    forward: () => {
      if (!timeline?.id) return
      ensureStoreReady((store) => store.forward(timeline.id))
    },
    reverse: () => {
      if (!timeline?.id) return
      ensureStoreReady((store) => store.reverse(timeline.id))
    }
  }
}

export default useAnimation
