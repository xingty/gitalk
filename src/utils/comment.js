import { GT_COMMENT_COUNT } from '../const'

export const getUsername = (comment,anonymous,i18n) => {
	const { accountName } = anonymous
	const username = comment.user.login
	if (accountName !== username) {
		return comment.user.login
	}

	try {
		const defaultName = i18n.t('anonymously-comment')
		let content = comment.body.split('\n')[0]
		const result = content.match('<!--(.*)-->')
		if (!result) { return defaultName }

		let name = result[1]
		if (name) {
			name = name.trim()
			if (name.length > 10) {
				name = name.substring(0,10) + '...'
			}

			return name
		}
	} catch(err) {
		return defaultName
	}

	return defaultName
}

export const parseBody = (comment,accountName) => {
	let commentBody = comment.body
	const username = comment.user.login
	if (accountName !== username) {
		return commentBody
	}

	let arr = comment.body.split('\n');
	let content = arr[0]
	const result = content.match('<!--(.*)-->')
	if (!result) { return commentBody }

	arr.shift()

	return arr.join('\n')
}

export const getCommentCount = (defaultValue = 0) => {
	return localStorage.getItem(GT_COMMENT_COUNT) || defaultValue
}

export const updateCommentCount = (commentCount) => {
	let count = getCommentCount()
	if (count >= commentCount) { return }

	localStorage.setItem(GT_COMMENT_COUNT,commentCount)
}