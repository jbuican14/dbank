// actor {
//   public query func greet(name : Text) : async Text {
//     return "Hello, " # name # "!";
//   };
// };
import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor Dbank {
  var currentValue : Float = 300;
  currentValue := 300;
  let id = 374655738277;
  // Debug.print(debug_show (id));
  // type Time = Int;
  stable var startTime = Time.now();
  Debug.print(debug_show (startTime));

  // deposit crypto
  public func topUp(amount : Float) {
    // Natural number
    currentValue += amount;
    Debug.print(debug_show (currentValue));
  };
  // topUp();df

  public func withdraw(amount : Float) {
    if (amount <= currentValue) {
      currentValue := currentValue - amount;
      Debug.print("Withdraw...");
      Debug.print(debug_show (currentValue));
    } else {
      Debug.print("You do not have sufficient fund");
    };
  };

  // read only operation to prevent the issue loading
  public query func checkBalance() : async Float {
    return currentValue;
  };

  public func compound() {
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;
    let timeElapsedS = timeElapsedNS / 1000000000;
    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedS));

    startTime := currentTime;
  };
};
