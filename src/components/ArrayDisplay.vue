<script setup lang="ts">
import { useTailwindBreakpoint } from '@/composables/tailscreen'
import { type ItemColors, type ItemHighlight } from '@/types'
import type { PropType } from 'vue'

const props = defineProps({
	data: {
		type: Array as PropType<number[]>,
		required: true
	},
	highlights: {
		type: Array as PropType<ItemHighlight[]>,
		required: true
	},
	showHighlight: {
		type: Boolean,
		default: true
	},
	hiddenCells: {
		type: Object as PropType<Record<number, boolean>>,
		required: true
	}
	// ...
})
const emits = defineEmits<{
	// (event: 'name'): void
}>()

const { size: breakpoint } = useTailwindBreakpoint()
const cell_size = computed(() => {
	if (breakpoint.value === 'sm' || breakpoint.value === 'md') {
		return ['w-16', 'h-16', 'h-28', 'w-12']
	} else {
		return ['w-32', 'h-32', 'h-48', 'w-16']
	}
})
const cell_offset = computed(() => {
	if (breakpoint.value === 'sm' || breakpoint.value === 'md') {
		return 4
	} else {
		return 8
	}
})
const cell_fraction = computed(() => {
	if (breakpoint.value === 'sm' || breakpoint.value === 'md') {
		return 0.15
	} else {
		return 0.25
	}
})

function is_cell_thin(cell: ItemHighlight) {
	return Math.floor(cell.index) !== cell.index
}

const colors: Record<ItemColors, string> = {
	red: 'from-ctp-red to-ctp-red/0',
	green: 'from-ctp-green to-ctp-green/0',
	blue: 'from-ctp-blue to-ctp-blue/0',
	yellow: 'from-ctp-yellow to-ctp-yellow/0',
	pink: 'from-ctp-pink to-ctp-pink/0',
	cyan: 'from-ctp-sky to-ctp-sky/0'
}
</script>

<template>
	<div class="grid place-items-center">
		<!-- <h1 class="text-2xl font-bold">Visualization</h1> -->
		<div class="relative isolate my-20">
			<template v-for="item in highlights" :key="item.character">
				<Transition name="fade">
					<div
						v-if="item.visible && showHighlight"
						class="absolute left-0 z-10 flex flex-col transition-all ease-in-out duration-500"
						:class="[
							item.position === 'bottom'
								? 'top-0 place-content-end bg-gradient-to-t'
								: 'bottom-0 place-content-start bg-gradient-to-b',
							colors[item.color],
							is_cell_thin(item) ? cell_size[3] : cell_size[0],
							cell_size[2]
						]"
						:style="{
							transform: `translate(${
								(item.index + (is_cell_thin(item) ? cell_fraction : 0)) *
								cell_offset
							}rem, 0px)`
						}"
					>
						<p
							class="text-center my-2 lg:my-4 font-serif text-2xl font-bold italic text-ctp-text"
						>
							{{ item.character }}
						</p>
					</div>
				</Transition>
			</template>
			<TransitionGroup name="list" tag="ul" class="flex flex-row z-20 relative">
				<li
					v-for="(item, index) in data"
					:key="item"
					class="border border-ctp-text grid place-items-center relative transition-opacity"
					:class="[
						cell_size[0],
						cell_size[1],
						hiddenCells[index] ? 'opacity-20' : 'opacity-100'
					]"
				>
					<p class="text-center font-bold text-4xl text-ctp-text">
						{{ item }}
					</p>
					<p class="absolute left-1/2 bottom-2 -translate-x-1/2 italic hidden md:block">
						{{ index }}
					</p>
				</li>
			</TransitionGroup>
		</div>
	</div>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
	transition: all 250ms ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
	transition: all 500ms ease-in-out;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateY(-30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
	position: absolute;
}
</style>
