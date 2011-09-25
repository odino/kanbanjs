socket = io.connect()
socket.on 'initStories', (data) ->
  stories = data.data
  for key of stories
    if stories[key].top
      addStory(stories[key].top, stories[key].left)
    else
      addStory()

socket.on 'initColumns', (data) ->
  columns = data.data
  for num in [0..columns]
    addColumn()

socket.on 'addcolumn', () ->
  addColumn()

socket.on 'addstory', () ->
  addStory()

socket.on 'movestory', (data) ->
  $( "#" + data.data.data.id ).animate({ 'top': data.data.data.top, 'left': data.data.data.left }, 0)

addColumn = ->
  columns = $( ".column" ).length + 1
  $( ".column" ).last().after('<div class="column"><h1>Plz more</h1></div>')
  $( ".column" ).css('width', 90/columns + '%')
 
addStory = (top, left) ->
  story = $('<div class="movable editable story" id="story-' + $('.story').length + '" >Story</div>');
  $( ".column" ).first().append(story)
  if top?
    story.animate({ 'top': top, 'left': left }, 0)
  $( ".movable" ).draggable({
     drag: (event, ui) ->
      info = {}
      info.id = $(this).attr('id')
      info.top = ui.position.top
      info.left = ui.position.left
      socket.emit('movestory', { "data": info })
  });
  $( ".editable" ).dblclick ->
    id = $(this).attr('id')
    story = $("#" + id)
    $("input").remove()
    story.hide()
    story.after("<input type='text' value='" + $("#" + id).html() + "' />")
    $('input').css('position', 'absolute')
    $('input').css('left', story.css('left'))
    top = parseInt(story.css('top'))
    $('input').css('top', (top + 100) + 'px')
    $("input").focusout ->
      val = $(this).attr('value')
      story.html(val)
      info = {}
      info.storyId = id
      info.storyValue = val
      $("input").remove()
      story.show()

 
$( "#columnAdd" ).click ->
  addColumn()
  socket.emit('addcolumn')
  return false

$( "#storyAdd" ).click ->
  addStory()
  socket.emit('addstory')
  return false