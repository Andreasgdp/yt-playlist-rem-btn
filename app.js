// Add event listener to the document once it's ready
document.addEventListener('DOMContentLoaded', () => {
	// Select the playlist items
	const playlistItems = document.querySelectorAll(
		'#playlist-autoscroll-list li.playlist-video-item'
	);

	// Add remove button to each playlist item
	playlistItems.forEach((item) => {
		const videoActions = item.querySelector(
			'.playlist-video-actions:not(.ytd-menu-renderer)'
		);
		if (videoActions) {
			const removeButton = createRemoveButton();
			removeButton.addEventListener('click', () => {
				removeVideoFromPlaylist(item);
			});
			videoActions.appendChild(removeButton);
		}
	});
});

// Function to create the remove button
function createRemoveButton() {
	const removeButton = document.createElement('button');
	removeButton.textContent = 'Remove';
	removeButton.classList.add('remove-button');
	return removeButton;
}

// Function to remove the video from the playlist
function removeVideoFromPlaylist(item) {
	const removeButton = item.querySelector('.remove-button');
	if (removeButton) {
		removeButton.disabled = true; // Disable button to prevent multiple clicks

		// Find the remove button in the playlist item
		const removeButtonInMenu = item.querySelector(
			'button[aria-label="Remove from playlist"]'
		);

		if (removeButtonInMenu) {
			removeButtonInMenu.click(); // Click the remove button in the menu
		}

		// Wait for the confirmation dialog to appear
		const confirmationDialog = document.querySelector(
			'#confirm-button > #confirm-button'
		);
		if (confirmationDialog) {
			confirmationDialog.click(); // Click the confirmation button
		}

		// Wait for the item to be removed from the DOM
		item.addEventListener('DOMNodeRemoved', () => {
			removeButton.disabled = false; // Re-enable the remove button
		});
	}
}
