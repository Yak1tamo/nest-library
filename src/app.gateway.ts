import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';
import { CommentService } from './comments/comments.service';
import { BookCommentDto } from './comments/dto/book-comment';

@WebSocketGateway({ cors: true })
export class AppGateway {
  constructor(private readonly commentService: CommentService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('getAllComments')
  handleGetAllComments(
    @MessageBody() id: string,
    @ConnectedSocket() client: Socket,
  ) {
    return this.commentService.findAllBookComment(id);
  }

  @SubscribeMessage('addComment')
  handleAddComment(@MessageBody() data: BookCommentDto) {
    return this.commentService.create(data);
  }
}
