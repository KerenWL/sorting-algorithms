type Breakpoints = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export function useTailwindBreakpoint() {
	const size = ref<Breakpoints>(get_breakpoint())

	function get_breakpoint(): Breakpoints {
		const width = window.innerWidth

		if (width <= 640) return 'sm'
		if (width <= 768) return 'md'
		if (width <= 1024) return 'lg'
		if (width <= 1280) return 'xl'

		return '2xl'
	}

	function on_screen_resize() {
		size.value = get_breakpoint()
	}

	onMounted(() => {
		window.addEventListener('resize', on_screen_resize)
	})

	onUnmounted(() => {
		window.removeEventListener('resize', on_screen_resize)
	})

	return { size }
}
