/**
 * $Id: editor_plugin_src.js 201 2007-02-12 15:56:56Z spocke $
 *
 * @author Moxiecode
 * @copyright Copyright � 2004-2007, Moxiecode Systems AB, All rights reserved.
 */

(function() {
	tinymce.create('tinymce.plugins.XHTMLXtrasPlugin', {
		XHTMLXtrasPlugin : function(ed, url) {
			// Register commands
			ed.addCommand('mceCite', function() {
				ed.windowManager.open({
					file : url + '/cite.htm',
					width : 350,
					height : 250,
					inline : 1
				}, {
					plugin_url : url
				});
			});

			ed.addCommand('mceAcronym', function() {
				ed.windowManager.open({
					file : url + '/acronym.htm',
					width : 350,
					height : 250,
					inline : 1
				}, {
					plugin_url : url
				});
			});

			ed.addCommand('mceAbbr', function() {
				ed.windowManager.open({
					file : url + '/abbr.htm',
					width : 350,
					height : 250,
					inline : 1
				}, {
					plugin_url : url
				});
			});

			ed.addCommand('mceDel', function() {
				ed.windowManager.open({
					file : url + '/del.htm',
					width : 350,
					height : 310,
					inline : 1
				}, {
					plugin_url : url
				});
			});

			ed.addCommand('mceIns', function() {
				ed.windowManager.open({
					file : url + '/ins.htm',
					width : 350,
					height : 310,
					inline : 1
				}, {
					plugin_url : url
				});
			});

			ed.addCommand('mceAttributes', function() {
				ed.windowManager.open({
					file : url + '/attributes.htm',
					width : 380,
					height : 370,
					inline : 1
				}, {
					plugin_url : url
				});
			});

			// Register buttons
			ed.addButton('cite', {title : 'xhtmlxtras.cite_desc', cmd : 'mceCite'});
			ed.addButton('acronym', {title : 'xhtmlxtras.acronym_desc', cmd : 'mceAcronym'});
			ed.addButton('abbr', {title : 'xhtmlxtras.abbr_desc', cmd : 'mceAbbr'});
			ed.addButton('del', {title : 'xhtmlxtras.del_desc', cmd : 'mceDel'});
			ed.addButton('ins', {title : 'xhtmlxtras.ins_desc', cmd : 'mceIns'});
			ed.addButton('attribs', {title : 'xhtmlxtras.attribs_desc', cmd : 'mceAttributes'});

			if (tinymce.isIE) {
				ed.onPostProcess.add(function(ed, o) {
					if (o.set) {
						o.content = o.content.replace(/<abbr([^>]+)>/gi, '<html:ABBR $1>');
						o.content = o.content.replace(/<\/abbr>/gi, '</html:ABBR>');
					}
				});
			}

			ed.onNodeChange.add(function(ed, cm, n, co) {
				n = ed.dom.getParent(n, 'CITE,ACRONYM,ABBR,DEL,INS');

				cm.setDisabled('cite', co);
				cm.setDisabled('acronym', co);
				cm.setDisabled('abbr', co);
				cm.setDisabled('del', co);
				cm.setDisabled('ins', co);
				cm.setDisabled('attribs', n && n.nodeName == 'BODY');

				if (n) {
					cm.setDisabled(n.nodeName.toLowerCase(), 0);
					cm.setActive(n.nodeName.toLowerCase(), 1);
				} else {
					cm.setActive('cite', 0);
					cm.setActive('acronym', 0);
					cm.setActive('abbr', 0);
					cm.setActive('del', 0);
					cm.setActive('ins', 0);
				}
			});
		},

		getInfo : function() {
			return {
				longname : 'XHTML Xtras Plugin',
				author : 'Moxiecode Systems AB',
				authorurl : 'http://tinymce.moxiecode.com',
				infourl : 'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/xhtmlxtras',
				version : tinymce.majorVersion + "." + tinymce.minorVersion
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add('xhtmlxtras', tinymce.plugins.XHTMLXtrasPlugin);
})();