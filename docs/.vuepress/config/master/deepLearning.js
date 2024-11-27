export const DeepLearningNavBar = {
	text: '不成文研究池',
	children: [
		{ text: 'Ubuntu', link: '/master/research/ubuntu/' },
		{ text: 'GNN', link: '/master/research/GNN/' },
		{ text: 'Python', link: '/master/research/python/' },
	]
}

export const DeepLearningSideBar = {
	'/master/research/ubuntu/': [
		{
			text: 'Ubuntu',
			children: [
				'/master/research/ubuntu/README.md',
				'/master/research/ubuntu/system_usage.md',
				'/master/research/ubuntu/python_usage.md',
				'/master/research/ubuntu/java_usage.md',
			],
		},
	],
	'/master/research/GNN/': [
		{
			text: 'GNN',
			children: [
				'/master/research/GNN/README.md',
				'/master/research/GNN/base_concept.md',
				'/master/research/GNN/pytorch_usage.md',
				'/master/research/GNN/python_usage.md',
			],
		},
	],
	'/master/python/': [
		{
			text: 'Python',
			children: [
				'/master/research/python/README.md',
				'/master/research/python/base_usage.md',
			],
		},
	],
}