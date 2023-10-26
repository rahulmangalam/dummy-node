
class User {
    constructor(username, password) {
      this.userId = User.generateUserId();
      this.username = username;
      this.password = password;
    }
    static generateUserId() {
      if (!this.counter) {
        this.counter = 1;
      } else {
        this.counter++;
      }
      return this.counter;
    }

}

class Connection{
    constructor(followeeId,followerId){
        this.followerId = followerId;
        this.followeeId = followeeId;
    }
}

class Message {
    constructor(userId,heading, description, location) {
        this.messageId = Message.generateMessageId();
        this.userId =userId;
        this.heading =heading;
        this.description= description;
        this.location =location;
        this.timestamp = new Date();
    }

    static generateMessageId() {
        if (!this.counter) {
          this.counter = 1;
        } else {
          this.counter++;
        }
        return this.counter;
      }
    getMessages(){
        return {
            time :this.timestamp,
            userId:this.userId,
            heading:this.heading,
            description:this.description,
            location:this.location
        }
    }
  }

  class SocialNetwork {
    users = [];
    messages = [];
    connections =[];
    constructor() {
    }
    addUser(username, password) {
      const newUser = new User(username, password);
      this.users.push(newUser);
      return newUser;
    }
    postMessage(user,heading,description,location){
        const msg = new Message(user.userId,heading,description,location);
        this.messages.push(msg);
    }
    getMessages(user,location){
        const userFollowee =this.connections.map( conn =>
            { 
                if(conn.followeeId === user.userId)
                    return conn.followerId;
            });
        let usrMsg = this.messages.filter(msg => { 
                const message = msg.getMessages();
                if(userFollowee.includes(message.userId) && ( location ? message.location === location : true )){
                    return message;
                }
            });
        usrMsg.forEach((msg)=>{
            console.log(msg?.heading,'\n',msg?.description,'\n\t',msg?.userId);
            console.log('----------------------');
        })
        console.log('******************************');
    }
    followUser(followee,follower){
        const conn = new Connection(followee.userId,follower.userId);
        this.connections.push(conn);
    }
    unfollowUser(followee,follower){
        let connIdx; 
        for(let i=0;i<this.connections.length;i++){
            if(this.connections[i].followeeId === followee.userId && this.connections[i].followerId === follower.userId){
                connIdx = i;
                break;
            }
        }
        if(!connIdx){
            console.log('invalid connection passed!');
            return;
        }
        this.connections.splice(connIdx,1);
    }
  }
  
  const socialNetwork = new SocialNetwork();
  const user1 = socialNetwork.addUser('user1', 'User One');
  const user2 = socialNetwork.addUser('user2', 'User Two');
  const user3 = socialNetwork.addUser('user3', 'User Three');
  socialNetwork.postMessage(user1,'helloWorld1','Hello, this is my 1 message!','delhi');
  socialNetwork.postMessage(user1,'helloWorld2','Hello, this is my 2 message!','jaipur');
  socialNetwork.postMessage(user1,'helloWorld3','Hello, this is my 3 message!','jaipur');
  socialNetwork.postMessage(user2,'helloWorld4','Hello, this is my 3 message!','udaipur');
  socialNetwork.postMessage(user2,'helloWorld5','Hello, this is my 4 message!','delhi');
  socialNetwork.postMessage(user3,'helloWorld6','Hello, this is my 5 message!','udaipur');
  socialNetwork.postMessage(user3,'helloWorld7','Hello, this is my 6 message!','delhi');
  socialNetwork.followUser(user1,user2);
  socialNetwork.followUser(user1,user3);
  socialNetwork.getMessages(user1);
  socialNetwork.unfollowUser(user1,user3);
  socialNetwork.getMessages(user1);
  socialNetwork.getMessages(user1,'delhi');
