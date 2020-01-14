const gremlin = require('gremlin');
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const traversal = gremlin.process.AnonymousTraversalSource.traversal;
const client = new gremlin.driver.Client('ws://db:8182/gremlin', { traversalSource: 'g' });

async function main() {
    console.log("Starting Gremlin data loading");
    var str = "g.V().drop().iterate();" +
        "dave = g.addV('person').property('first_name','Dave').next();" +
        "josh = g.addV('person').property('first_name','Josh').next();" +
        "ted = g.addV('person').property('first_name','Ted').next();" +
        "hank = g.addV('person').property('first_name','Hank').next();" +
        "g.addE('friends').from(dave).to(ted)." +
        "addE('friends').from(dave).to(josh)." +
        "addE('friends').from(dave).to(hank)." +
        "addE('friends').from(josh).to(hank)." +
        "addE('friends').from(ted).to(josh).iterate();" +
        "kelly = g.addV('person').property('first_name', 'Kelly').next();" +
        "jim = g.addV('person').property('first_name', 'Jim').next();" +
        "paras = g.addV('person').property('first_name', 'Paras').next();" +
        "denise = g.addV('person').property('first_name', 'Denise').next();" +
        "g.addE('friends').from(dave).to(jim)." +
        "addE('friends').from(dave).to(kelly)." +
        "addE('friends').from(kelly).to(jim)." +
        "addE('friends').from(kelly).to(denise)." +
        "addE('friends').from(jim).to(denise)." +
        "addE('friends').from(jim).to(paras)." +
        "addE('friends').from(paras).to(denise).iterate();"

    const result1 = await client.submit(str);

    const g = traversal().withRemote(new DriverRemoteConnection('ws://db:8182/gremlin'));
    var res = await g.V().count().next()
    console.log(res.value)
    process.exit(0);
}

main();