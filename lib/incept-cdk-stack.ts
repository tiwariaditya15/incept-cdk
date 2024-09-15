import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
export class InceptCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const greeter = new lambda.Function(this, "incept-greeter", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "index.handler",
      code: lambda.Code.fromInline(`
            exports.handler = async function(event) {
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        date: new Date()
                    })
                }
            }
        `),
    });

    const greeterUrl = greeter.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    new cdk.CfnOutput(this, "greeterUrlOutput", {
      value: greeterUrl.url,
    });
  }
}
