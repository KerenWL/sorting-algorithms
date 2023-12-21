import { defineStore } from 'pinia'
import { ref } from 'vue'

type Theme = 'light' | 'dark'

export const useThemeStore = defineStore('theme', () => {
	const theme = ref<'light' | 'dark'>('light')

	function loadTheme() {
		if (localStorage.getItem('sort:theme')) {
			theme.value = localStorage.getItem('sort:theme') as Theme
		} else {
			theme.value =
				window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
					? 'dark'
					: 'light'
		}
	}

	function applyTheme() {
		if (theme.value === 'light') {
			document.body.classList.add('ctp-latte')
			document.body.classList.remove('ctp-mocha')
		}
		if (theme.value === 'dark') {
			document.body.classList.remove('ctp-latte')
			document.body.classList.add('ctp-mocha')
		}
	}

	function saveTheme(theme: Theme) {
		localStorage.setItem('sort:theme', theme)
	}

	return { theme, loadTheme, applyTheme, saveTheme }
})
