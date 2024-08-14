<?php

namespace App\Http\Controllers;

use App\Mail\loginVerification;
use App\Models\User;
use App\Notifications\LoginNeedsVerification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class LoginController extends Controller
{
  public function submit(Request $request)
  {
    // Validate
    $request->validate([
      'email' => 'required|email|string'
    ]);
    //Create Or Find A User Model
    $user = User::firstOrCreate([
      'email' => $request->email
    ]);
    if (!$user) {
      return response()->json(['message' => 'Can`t Process A User With This Email'], 401);
    }
    // Send The User A One-Time Use Code
    // $user->notify(new LoginNeedsVerification());
    $login_code = rand(111111, 999999);
    $user->update(['login_code' => $login_code]);
    Mail::to($user->email)->send(new loginVerification($login_code));
    //Return Back A Response
    return response()->json(['message' => 'Email Verification Sent']);
  }
  public function verify(Request $request)
  {
    //Validate The Coming Request
    $request->validate([
      'email' => 'required|email|string',
      'login_code' => 'required|numeric|between:111111,999999'
    ]);

    //Find The User
    $user = User::where('email', $request->email)->where('login_code', $request->login_code)->first();
    //Is The Code Provided is The Same Saved
    //If So , Return back A Auth Token
    if ($user) {
      $user->update(['login_code' => null]);
      return $user->createToken($request->login_code)->plainTextToken;
    }

    // // If Not , Return back Message
    return response()->json(['message' => 'invalid Verification Code'], 401);
  }
}
