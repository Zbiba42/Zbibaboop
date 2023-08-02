const Post = require('../models/post')
const Reaction = require('../models/reaction')
const Comment = require('../models/comment')
const Notification = require('../models/notification')

const Posts = (io, socket) => {
  //////////////////////////////////////////
  socket.on('postReaction', async (data) => {
    try {
      let reaction = await Reaction.findOne({
        owner: data.id,
        onPost: data.postId,
      })
      const post = await Post.findOne({ _id: data.postId })
      if (!reaction) {
        reaction = await Reaction.create({
          owner: data.id,
          onPost: data.postId,
          reaction: data.reactionType,
        })
        await Post.updateOne(
          { _id: data.postId },
          { $addToSet: { reactions: reaction } }
        )
        const notification = await Notification.create({
          sender: data.id,
          receiver: post.owner,
          type: 'postReaction',
          content: { postId: post._id },
        })
        await User.updateOne(
          { _id: post.owner },
          {
            $push: {
              notifications: notification,
            },
          }
        )
        io.to(post.owner).emit('notification')
      }
      if (reaction.reaction !== data.reactionType) {
        reaction.reaction = data.reactionType
        await reaction.save()

        await Post.updateOne(
          { _id: data.postId },
          { $pull: { reactions: { owner: data.id } } }
        )

        await Post.updateOne(
          { _id: data.postId },
          { $addToSet: { reactions: reaction } }
        )
      }
    } catch (error) {
      io.to(data.id).emit('reactionResponse', { succes: false })
    }
  })
  //////////////////////////////////////////
  socket.on('postComment', async (data) => {
    let commentObj = {
      owner: data.id,
      onPost: data.postId,
      content: data.content,
      files: [],
    }

    if (data.files) {
      const filePath = `./uploads/${data.id}`
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)

      for (const file of data.files) {
        const extension = file.fileName.split('.').pop()
        const fileName = `file-${uniqueSuffix}.${extension}`
        const fileDestination = path.join(filePath, fileName)

        try {
          const fileData = Buffer.from(file.file)
          if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, { recursive: true })
          }
          fs.writeFile(
            fileDestination,
            fileData,
            {
              encoding: 'binary',
            },
            (err) => {
              if (err) {
                io.to(data.id).emit('commentResponse', {
                  succes: false,
                })
                return
              }
            }
          )
          commentObj.files.push(fileDestination)
        } catch (error) {
          io.to(data.id).emit('commentResponse', { succes: false })
        }
      }
    }
    try {
      const comment = await Comment.create(commentObj)
      const post = await Post.findOne({ _id: data.postId })
      post.comments.push(comment)
      await post.save()

      const notification = await Notification.create({
        sender: data.id,
        receiver: post.owner,
        type: 'postComment',
        content: { postId: post._id },
      })
      await User.updateOne(
        { _id: post.owner },
        {
          $push: {
            notifications: notification,
          },
        }
      )
      io.to(post.owner).emit('notification')
    } catch (error) {
      io.to(data.id).emit('commentResponse', { succes: false })
    }
  })
  //////////////////////////////////////////
  socket.on('commentReply', async (data) => {
    let replyObj = {
      owner: data.id,
      onComment: data.commentId,
      content: data.content,
      isReply: true,
      files: [],
    }

    if (data.files) {
      const filePath = `./uploads/${data.id}`
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)

      for (const file of data.files) {
        const extension = file.fileName.split('.').pop()
        const fileName = `file-${uniqueSuffix}.${extension}`
        const fileDestination = path.join(filePath, fileName)

        try {
          const fileData = Buffer.from(file.file)
          if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, { recursive: true })
          }
          fs.writeFile(
            fileDestination,
            fileData,
            {
              encoding: 'binary',
            },
            (err) => {
              if (err) {
                io.to(data.id).emit('commentResponse', {
                  succes: false,
                })
                return
              }
            }
          )
          replyObj.files.push(fileDestination)
        } catch (error) {
          io.to(data.id).emit('commentResponse', { succes: false })
        }
      }
    }
    try {
      const reply = await Comment.create(replyObj)
      const comment = await Comment.findOne({ _id: data.commentId })
      comment.replies.push(reply)
      await comment.save()

      const notification = await Notification.create({
        sender: data.id,
        receiver: comment.owner,
        type: 'commentReply',
        content: { commentId: comment._id },
      })
      await User.updateOne(
        { _id: comment.owner },
        {
          $push: {
            notifications: notification,
          },
        }
      )
      io.to(comment.owner).emit('notification')
    } catch (error) {
      io.to(data.id).emit('commentResponse', { succes: false })
    }
  })
  //////////////////////////////////////////
  socket.on('commentReaction', async (data) => {
    try {
      let reaction = await Reaction.findOne({
        owner: data.id,
        onComment: data.commentId,
      })
      const comment = await Comment.findOne({ _id: data.commentId })
      if (!reaction) {
        reaction = await Reaction.create({
          owner: data.id,
          onComment: data.postId,
          reaction: data.reactionType,
        })
        await Comment.updateOne(
          { _id: data.commentId },
          { $addToSet: { reactions: reaction } }
        )
        const notification = await Notification.create({
          sender: data.id,
          receiver: comment.owner,
          type: 'commentReaction',
          content: { postId: comment._id },
        })
        await User.updateOne(
          { _id: comment.owner },
          {
            $push: {
              notifications: notification,
            },
          }
        )
        io.to(comment.owner).emit('notification')
      }
      if (reaction.reaction !== data.reactionType) {
        reaction.reaction = data.reactionType
        await reaction.save()

        await Comment.updateOne(
          { _id: data.commentId },
          { $pull: { reactions: { owner: data.id } } }
        )

        await Comment.updateOne(
          { _id: data.commentId },
          { $addToSet: { reactions: reaction } }
        )
      }
    } catch (error) {
      io.to(data.id).emit('reactionResponse', { succes: false })
    }
  })
}

module.exports = { Posts }
