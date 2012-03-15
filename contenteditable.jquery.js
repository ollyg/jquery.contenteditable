(function($){
	$.fn.contenteditable = function(settings)
	{
		var config = {
			url     : 'save.php',
			callback: response,
			label   : 'Save',
			class   : 'closer',
			href    : '#'
		};

		$.extend(config, settings);

		// for all editable items
		this.each(function(){

			var $self = $(this);

			$self
			  .on('click', edit)
			  .on('blur' , blur);
 
			function edit() {
				$self.data('before', $self.html());

				// create save link if not there
				if (!$self.next().is('a.closer')) {
					$('<a></a>', {
						href : config.href,
						text : config.label,
						class: config.class
					})
					.on('click', save)
					.insertAfter(this);
				}

				$self
				  .on('keypress', enter)
				  .on('keyup'   , esc);
			}

			function enter(event) {
				if (event.keyCode == 13) {
					$self
					  .trigger('blur')
					  .next('a.closer')
					  .trigger('click');
				}
			}

			function esc(event) {
				if (event.keyCode == 27) $self.trigger('blur');
			}

			function save() {
				validate();

				// Send ajax request
				$.post(config.url,
				{
					id   : $self.data('id'),
					value: $self.html()
				},
				config.callback);

				$(this).remove();

				// stop hyperlink default
				return false;
			}

			function blur() {
				validate();

				var $this = $(this),
					timer = window.setTimeout(function(){
						$this.next('a.closer').remove();
						window.clearTimeout(timer);
				}, 100);
			}

			// Check if empty
			function validate() {
				if ($self.html() === '') $self.html( $self.data('before') );
			}
		});

		// default response func for ajax request
		function response(status)
		{
			// status ca be 'success' or 'fail' as string
		}

	}
})(jQuery);