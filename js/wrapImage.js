function wrapImageWithFancyBox(){$("img").not(".sidebar-image img").not("#author-avatar img").not(".mdl-menu img").each(function(){var a=$(this),t=a.attr("alt"),n=a.parent("a");n.size()<1&&(n=a.wrap('<a href="'+this.getAttribute("src")+'"></a>').parent("a")),n.attr("data-fancybox","images"),t&&n.attr("data-caption",t)}),$().fancybox({selector:'[data-fancybox="images"]',thumbs:!0,hash:!1,loop:!1})}$(document).ready(function(){wrapImageWithFancyBox()});