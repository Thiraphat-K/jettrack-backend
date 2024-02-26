import { Injectable } from '@nestjs/common';
import {Socket} from 'socket.io';

@Injectable()
class SocketSessionService {
    private static clients = new Map();

    public static register(client: Socket) {
        if (!this.clients.has(client.id)) {
            this.clients.set(client.id, client);
            client.broadcast.emit('joiner', {message: `${client.id} joined`});
            client.on('disconnect', () => {
                this.clients.delete(client.id);
                console.log(`client disconnected:  ${this.clients.size}`, client.id);
            });
        }
    }

    public static broadcast(message: string) {
        this.clients.forEach(client => {
            client.emit('response', {message});
        });
    }

    public hey(): string {
      return "hello"
    }
}

export default SocketSessionService