/*
	File: Explorer.js
	Author: David Villalobos
	Date: 12/02/2021
*/

const fs = require('fs');
const dirTree = require('directory-tree');
let explorer = document.getElementById("explorer");

function getIcon(extension){
	var result = '<span> <i class="'
	if(extension == undefined) {
		result += 'fas fa-folder-open'
	} else if(extension == '.cpp' || extension == '.h'){
		result += 'fab fa-cuttlefish'
	} else if(extension == '.py'){ 
		result += 'fab fa-python'
	} else if(extension == '.java'){ 
		result += 'fab fa-java'
	} else {
		result += 'fas fa-file'
	}
	result += '"> </i> </span>'
	return result	
}


function printDirectoryTree(myTree, levels) {
	let result = '';
	for (let branch of myTree['children']) {
		result += '<button class="button has-text-white" value="' + branch['path'] + '" onclick="openFile(this.value)">' +
		getIcon(branch['extension']) + branch['name'] +
		'</button>'
		if(branch['type'] == 'directory'){
			result += '<ul class="menu-list">'
			if(branch['children']) { // branch has child? (is a directory)
				let aux_levels = [...levels]
				aux_levels.push([aux_levels.length-1, true])
				result += printDirectoryTree(branch, aux_levels)
			}
			result += '</ul>'
		}
	}
	return result
}

function generateTreePanel(folder_path){
	let folder_name = folder_path.split("\\")[folder_path.split("\\").length-1]
	let ext = /.*/; // filtered tree
	let tree = dirTree(folder_path, { extensions : ext } );
	if(tree){
		explorer.innerHTML += '<div class="has-background-warning has-text-dark" style="margin-bottom: 8px">' +
	'		' + folder_name +
	'	</div>' +
	'	<ul class="menu-list" id="directory-content">' +
	'		<li>' + printDirectoryTree(tree, [[0, true]]) + '</li>' +
	'	</ul>'
	}else{
		explorer.innerHTML += '<h1 style="color: red;">Path not found -> ' + folder_path + '<h1>'
	}
}

generateTreePanel('C:\\Users\\luisd\\Desktop\\Test'); // <-- Choose a path

function openFile(path_file){
	console.log(path_file)
	//fs.readFileSync(path_file)
}