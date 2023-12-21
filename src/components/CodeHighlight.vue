<script setup lang="ts">
import { useTailwindBreakpoint } from '@/composables/tailscreen'

const props = defineProps({
	code: {
		type: String,
		required: true
	},
	index: {
		type: Number,
		default: 0
	},
	showTitle: {
		type: Boolean,
		default: false
	}
})

interface Tag {
	pattern: RegExp
	color: string
}
const tags: Array<Tag> = [
	{ pattern: /(\<|\>|\+\+?|\-\-?|\/|\=|\&\&|\|\|)/g, color: 'text-ctp-green' },
	{ pattern: /(\[|\]|\(|\)|\{|\})/g, color: 'text-ctp-red' },
	{ pattern: /([0-9]+)/g, color: 'text-ctp-peach' },
	{
		pattern: /(for|int|if|break|else|while|public|void|int|return|new)/g,
		color: 'text-ctp-mauve'
	},
	{ pattern: /(floor)/g, color: 'text-ctp-blue' },
	{ pattern: /(\;|\.)/g, color: 'text-ctp-overlay0' },
	{ pattern: /(\/\/.+)/g, color: '!text-ctp-surface0' }
]

const formattedCode = computed(() => {
	const line = props.code.split('\n')

	for (let i = 0; i < line.length; i++) {
		let new_line = line[i]
		new_line = new_line.trimEnd()

		// Adjust syntax highlight.
		for (const tag of tags) {
			new_line = new_line.replace(tag.pattern, `<span class="${tag.color}">$1</span>`)
		}

		if (i === props.index) {
			new_line = `<span class="line_highlight">${new_line}</span>`
		}

		new_line = `<span class="select-none opacity-60">${(i + 1)
			.toString()
			.padStart(2, ' ')}\t</span>${new_line}`

		line[i] = `<span>${new_line}</span>`
	}

	return line
})

const highlightYPos = ref(0)
const highlightOffset = ref(0)
const preParent = ref<HTMLSpanElement | null>(null)
function changeHighlightYPos(index: number) {
	if (!preParent.value) return

	const spans = preParent.value.querySelectorAll(':scope > span')
	if (spans.length === 0) return

	const span = spans.item(index) as HTMLSpanElement
	if (span === null) return
	highlightYPos.value = span.offsetTop + highlightOffset.value
}

watch(
	() => props.index,
	(i) => {
		changeHighlightYPos(i)
	}
)

const { size: breakpoint } = useTailwindBreakpoint()
watch(
	breakpoint,
	(v) => {
		if (v === 'sm' || v === 'md') {
			highlightOffset.value = 1
			changeHighlightYPos(props.index)
		} else {
			highlightOffset.value = 2
			changeHighlightYPos(props.index)
		}
	},
	{ immediate: true }
)

onMounted(() => {
	changeHighlightYPos(props.index)
})
</script>

<template>
	<div>
		<h1 class="text-2xl font-bold text-center mb-2" v-if="showTitle">Pseudocode</h1>
		<div class="w-full max-w-[80vw] overflow-x-auto grid place-items-center">
			<div class="text-ctp-text relative text-base lg:text-2xl">
				<pre ref="preParent" class="text-left" v-html="formattedCode.join('\n')"></pre>
				<div
					class="block w-1/2 h-[1.25em] absolute -top-[0.125em] bg-gradient-to-r from-ctp-text/25 to-ctp-text/0 transition-all duration-250 pointer-events-none"
					:class="[index < 0 ? 'opacity-0' : 'opacity-100']"
					:style="{ transform: `translate(0px, ${highlightYPos}px)` }"
				></div>
			</div>
		</div>
	</div>
</template>
