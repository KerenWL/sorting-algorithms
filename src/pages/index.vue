<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const router = useRouter()

const themeStore = useThemeStore()

const oppositeTheme = computed(() => {
	return themeStore.theme === 'dark' ? 'light' : 'dark'
})

function changeTheme() {
	themeStore.theme = themeStore.theme === 'dark' ? 'light' : 'dark'

	themeStore.applyTheme()
	themeStore.saveTheme(themeStore.theme)
}
</script>

<template>
	<main class="min-h-screen flex place-items-center">
		<div class="max-w-md mx-auto">
			<div>
				<Title />
				<p @dblclick="router.push('/whistle')">© BS301A ⋅ Group 3 ⋅ 2023</p>
			</div>

			<div class="mt-8">
				<h2 class="font-bold text-xl">
					&OpenCurlyDoubleQuote;Sorting&CloseCurlyDoubleQuote;
				</h2>
				<p class="indent-2 border-l-2 border-l-gray-600 italic pl-4">
					: the act of arranging data in a <em>specific order</em>; to put things in a
					<em>sequence</em>.
				</p>
			</div>

			<div class="mt-8">
				<h2 class="font-bold text-xl mb-2">Types of Sorting Algorithms</h2>
				<ul class="list-disc list-inside">
					<li>
						<RouterLink to="/algorithms/bubble">Bubble Sort</RouterLink>
					</li>
					<li>
						<RouterLink to="/algorithms/selection">Selection Sort</RouterLink>
					</li>
					<li>
						<RouterLink to="/algorithms/insertion">Insertion Sort</RouterLink>
					</li>
					<li>
						<RouterLink to="/algorithms/shell">Shell Sort</RouterLink>
					</li>
					<li>
						<RouterLink to="/algorithms/merge">Merge Sort</RouterLink>
					</li>
				</ul>
			</div>

			<div class="mt-8">
				<h2 class="font-bold text-xl mb-2">Miscellaneous</h2>
				<ul class="list-disc list-inside">
					<li>
						<RouterLink to="/icebreaker">Ice Breaker</RouterLink>
					</li>
					<li>
						<button class="italic opacity-50" @click="changeTheme">
							Change theme to {{ oppositeTheme }}
						</button>
					</li>
				</ul>
			</div>
		</div>
	</main>
</template>
