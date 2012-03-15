(function($){
	$.fn.contenteditable = function()
	{
		// for all editable items
		this.each(function(){

			var self  = this,
				$self = $(self);

			$self
			  .on('click', edit)
			  .on('blur' , blur);
 
			function edit() {
				$self.data('before', $self.html());

				// create save link if not there
				if (!$self.next().is('a.closer')) {
					$('<a></a>', {
						href: '#', text: 'Save', class: 'closer'
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

				console.log('saved');
				$(this).remove();
			}

			function blur() {
				validate();

				var $this = $(this),
					timer = window.setTimeout(function(){
						$this.next('a.closer').remove();
						window.clearTimeout(timer);
				}, 100);
			}

			function validate() {
				if ($self.html() === '') $self.html( $self.data('before') );
			}
		});

	}
})(jQuery);