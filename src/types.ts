export type ItemColors = 'red' | 'green' | 'blue' | 'yellow' | 'pink' | 'cyan'
export interface ItemHighlight {
	index: number
	color: ItemColors
	character: string
	position: 'bottom' | 'top'
	visible: boolean
}

export type SortFunctionMethods = {
	wait: (skippable: boolean) => Promise<void>
	toggle: (index: number, visible: boolean) => Promise<void>
}

export type SortFunction = (
	array: number[],
	methods: SortFunctionMethods,
	setIndex: (i: number) => void
) => Promise<void>
